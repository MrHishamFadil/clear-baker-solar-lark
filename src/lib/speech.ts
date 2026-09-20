import { useSyncExternalStore } from "react";
import { prepareArabicTts } from "@/lib/arabic-tts";
import { synthesizeSpeech } from "@/lib/tts";
import type { Lang, Section, TtsVoice } from "./types";

export type TtsGender = "male" | "female";
export type SpeakPhase = "idle" | "loading" | "playing";

export { prepareArabicTts } from "@/lib/arabic-tts";

type Snapshot = { key: string | null; phase: SpeakPhase };

const MAX_MEM = 40;
const CHUNK = 1400;
const blobCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;
let currentToken = 0;

let snapshot: Snapshot = { key: null, phase: "idle" };
const listeners = new Set<() => void>();

function emit(next: Snapshot) {
  snapshot = next;
  listeners.forEach((fn) => fn());
}

export function resolveTtsGender(section: Section, ttsVoice: TtsVoice): TtsGender {
  if (ttsVoice === "male" || ttsVoice === "female") return ttsVoice;
  return section === "girls" ? "female" : "male";
}

export function voiceCaption(lang: Lang, gender: TtsGender) {
  if (lang === "ar") {
    return gender === "female"
      ? { name: "زارية", locale: "لهجة سعودية" }
      : { name: "حامد", locale: "لهجة سعودية" };
  }
  return gender === "female"
    ? { name: "Jenny", locale: "American English" }
    : { name: "Andrew", locale: "American English" };
}

export function joinSpeak(parts: Array<string | string[] | undefined | null>) {
  return parts
    .flatMap((p) => (Array.isArray(p) ? p : [p]))
    .map((p) => (p || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" [pause] ");
}

export function chunkSpeak(text: string, max = CHUNK): string[] {
  const clean = text.trim();
  if (clean.length <= max) return [clean];
  const out: string[] = [];
  let buf = "";
  for (const piece of clean.split(/\s*\[pause\]\s*/i)) {
    const next = buf ? `${buf} [pause] ${piece}` : piece;
    if (next.length <= max) {
      buf = next;
      continue;
    }
    if (buf) out.push(buf);
    if (piece.length <= max) {
      buf = piece;
      continue;
    }
    let rest = piece;
    while (rest.length > max) {
      const window = rest.slice(0, max);
      let cut = Math.max(window.lastIndexOf("."), window.lastIndexOf("。"), window.lastIndexOf("؟"), window.lastIndexOf("!"));
      if (cut < max * 0.35) cut = Math.max(window.lastIndexOf("،"), window.lastIndexOf(","));
      if (cut < max * 0.35) cut = window.lastIndexOf(" ");
      if (cut < 40) cut = max;
      out.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    buf = rest;
  }
  if (buf) out.push(buf);
  return out.filter(Boolean);
}

export function useSpeakStatus() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => snapshot,
  );
}

function rememberBlob(key: string, url: string) {
  if (blobCache.has(key)) {
    const prev = blobCache.get(key);
    if (prev && prev !== url) URL.revokeObjectURL(prev);
    blobCache.delete(key);
  }
  blobCache.set(key, url);
  while (blobCache.size > MAX_MEM) {
    const oldest = blobCache.keys().next().value;
    if (oldest === undefined) break;
    const stale = blobCache.get(oldest);
    blobCache.delete(oldest);
    if (stale) URL.revokeObjectURL(stale);
  }
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

export function stopSpeak() {
  currentToken += 1;
  stopAudio();
  emit({ key: null, phase: "idle" });
}

function pickBrowserVoice(lang: Lang, gender: TtsGender): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const wantFemale = gender === "female";
  const ranked = voices.map((v) => {
    const tag = `${v.name} ${v.lang}`.toLowerCase();
    let score = 0;
    const isFemale = /female|zariyah|jenny|samantha|aria|ava|eve|woman|girl/.test(tag);
    const isMale = /male|hamed|andrew|guy|david|daniel|alex\b|man\b/.test(tag);
    if (wantFemale && isFemale) score += 12;
    if (!wantFemale && isMale) score += 12;
    if (wantFemale && isMale) score -= 8;
    if (!wantFemale && isFemale) score -= 8;
    if (lang === "ar") {
      if (v.lang.toLowerCase().startsWith("ar-sa")) score += 50;
      else if (v.lang.toLowerCase().startsWith("ar")) score += 22;
      if (tag.includes("saudi") || tag.includes("hamed") || tag.includes("zariyah")) score += 28;
    } else {
      if (v.lang.toLowerCase().startsWith("en-us")) score += 50;
      else if (/en-gb|en-au|en-in/.test(v.lang.toLowerCase())) score -= 35;
      if (tag.includes("us english") || tag.includes("american") || tag.includes("google us")) score += 24;
      if (tag.includes("british") || tag.includes("uk english")) score -= 40;
    }
    return { v, score };
  });
  ranked.sort((a, b) => b.score - a.score);
  return ranked[0] && ranked[0].score > 0 ? ranked[0].v : undefined;
}

function fallbackSpeak(text: string, lang: Lang, gender: TtsGender, key: string, token: number) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    if (token === currentToken) emit({ key: null, phase: "idle" });
    return;
  }
  const utter = new SpeechSynthesisUtterance(text.replace(/\s*\[pause\]\s*/gi, ". "));
  utter.lang = lang === "ar" ? "ar-SA" : "en-US";
  utter.rate = lang === "ar" ? 0.9 : 0.96;
  const voice = pickBrowserVoice(lang, gender);
  if (voice) utter.voice = voice;
  utter.onend = () => {
    if (token === currentToken) emit({ key: null, phase: "idle" });
  };
  utter.onerror = () => {
    if (token === currentToken) emit({ key: null, phase: "idle" });
  };
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
  emit({ key, phase: "playing" });
}

function bytesFromBase64(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function playBlob(url: string, token: number): Promise<"ok" | "err" | "cancel"> {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    currentAudio = audio;
    const finish = (result: "ok" | "err" | "cancel") => {
      audio.onended = null;
      audio.onerror = null;
      resolve(result);
    };
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      finish(token === currentToken ? "ok" : "cancel");
    };
    audio.onerror = () => finish(token === currentToken ? "err" : "cancel");
    void audio.play().catch(() => finish(token === currentToken ? "err" : "cancel"));
  });
}

async function fetchPart(text: string, lang: Lang, gender: TtsGender) {
  const cacheKey = `${gender}:${lang}:${text}`;
  const cached = blobCache.get(cacheKey);
  if (cached) return cached;
  const res = await synthesizeSpeech({ data: { text, lang, voice: gender } });
  if (!res.ok) return null;
  const blob = new Blob([bytesFromBase64(res.audio)], { type: res.mime || "audio/mpeg" });
  const url = URL.createObjectURL(blob);
  rememberBlob(cacheKey, url);
  return url;
}

export async function speak(text: string, lang: Lang, gender: TtsGender) {
  const trimmed = text.trim();
  if (!trimmed || typeof window === "undefined") return;
  const key = `${gender}:${lang}:${trimmed}`;
  if (snapshot.phase !== "idle" && snapshot.key === key) {
    stopSpeak();
    return;
  }
  const token = ++currentToken;
  stopAudio();
  emit({ key, phase: "loading" });
  const spoken = lang === "ar" ? prepareArabicTts(trimmed) : trimmed;

  try {
    const parts = chunkSpeak(spoken);
    for (let i = 0; i < parts.length; i += 1) {
      if (token !== currentToken) return;
      const url = await fetchPart(parts[i], lang, gender);
      if (token !== currentToken) return;
      if (!url) {
        fallbackSpeak(spoken, lang, gender, key, token);
        return;
      }
      if (i === 0) emit({ key, phase: "playing" });
      const result = await playBlob(url, token);
      if (token !== currentToken || result === "cancel") return;
      if (result === "err") {
        fallbackSpeak(spoken, lang, gender, key, token);
        return;
      }
    }
    if (token === currentToken) emit({ key: null, phase: "idle" });
  } catch {
    if (token === currentToken) fallbackSpeak(spoken, lang, gender, key, token);
  }
}
