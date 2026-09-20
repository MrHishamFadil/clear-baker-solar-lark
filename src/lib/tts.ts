import { createServerFn } from "@tanstack/react-start";
import type { Lang } from "./types";

const MAX_CHARS = 4000;
const CACHE_LIMIT = 80;

type Gender = "male" | "female";

const VOICE_ID: Record<Gender, Record<Lang, string>> = {
  male: { ar: "leo", en: "rex" },
  female: { ar: "luna", en: "eve" },
};

const cache = new Map<string, { audio: string; mime: string }>();

function cacheGet(key: string) {
  const hit = cache.get(key);
  if (!hit) return null;
  cache.delete(key);
  cache.set(key, hit);
  return hit;
}

function cacheSet(key: string, value: { audio: string; mime: string }) {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, value);
  while (cache.size > CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }
}

function parseInput(input: unknown): { text: string; lang: Lang; voice: Gender } {
  if (!input || typeof input !== "object") throw new Error("invalid tts input");
  const rec = input as Record<string, unknown>;
  const text = typeof rec.text === "string" ? rec.text.trim() : "";
  if (!text) throw new Error("text required");
  if (rec.lang !== "ar" && rec.lang !== "en") throw new Error("lang required");
  if (rec.voice !== "male" && rec.voice !== "female") throw new Error("voice required");
  return {
    text: text.slice(0, MAX_CHARS),
    lang: rec.lang,
    voice: rec.voice,
  };
}

async function callXaiTts(opts: {
  text: string;
  lang: Lang;
  voice: Gender;
  apiKey: string;
}): Promise<{ ok: true; audio: string; mime: string } | { ok: false; error: string }> {
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: opts.text,
      voice_id: VOICE_ID[opts.voice][opts.lang],
      language: opts.lang === "ar" ? "ar-SA" : "en",
      speed: opts.lang === "ar" ? 0.86 : 0.96,
      text_normalization: true,
      output_format: {
        codec: "mp3",
        sample_rate: 24000,
        bit_rate: 128000,
      },
    }),
  });
  if (!res.ok) {
    return { ok: false, error: `tts ${res.status}` };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 64) return { ok: false, error: "tts empty" };
  return { ok: true, audio: buf.toString("base64"), mime: "audio/mpeg" };
}

export const synthesizeSpeech = createServerFn({ method: "POST" })
  .validator(parseInput)
  .handler(async ({ data }): Promise<{ ok: true; audio: string; mime: string } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "unavailable" };

    const key = `${data.voice}:${data.lang}:${data.text}`;
    const cached = cacheGet(key);
    if (cached) return { ok: true, ...cached };

    let result = await callXaiTts({ ...data, apiKey });
    if (!result.ok) {
      await new Promise((r) => setTimeout(r, 400));
      result = await callXaiTts({ ...data, apiKey });
    }
    if (result.ok) cacheSet(key, { audio: result.audio, mime: result.mime });
    return result;
  });
