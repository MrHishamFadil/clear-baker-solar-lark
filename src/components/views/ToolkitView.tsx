import { useEffect, useState } from "react";
import { Dual } from "@/components/Dual";
import { ListenButton, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { CHECKLIST, gradeConfig } from "@/lib/content";
import { playBell, playTick } from "@/lib/audio";
import { VOICE_COPY, tx } from "@/lib/i18n";
import { resolveTtsGender, voiceCaption } from "@/lib/speech";
import { EMPTY_ROSTER, makeRosterKey, useApp } from "@/lib/store";
import type { TtsVoice } from "@/lib/types";
import { todayISO } from "@/lib/utils";
import boysAr from "@/data/boys-ar.json";
import boysEn from "@/data/boys-en.json";
import girlsAr from "@/data/girls-ar.json";
import girlsEn from "@/data/girls-en.json";

export function ToolkitView() {
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const section = useApp((s) => s.section);
  const voice = useApp((s) => s.voiceLevel);
  const setVoice = useApp((s) => s.setVoice);
  const ttsVoice = useApp((s) => s.ttsVoice);
  const setTtsVoice = useApp((s) => s.setTtsVoice);
  const squads = useApp((s) => s.squads);
  const checklist = useApp((s) => s.checklist);
  const classId = useApp((s) => s.classId);
  const rosters = useApp((s) => s.rosters);
  const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
  const cfg = gradeConfig(grade);
  const base = Math.round(60 * cfg.timerScale);
  const [seconds, setSeconds] = useState(base);
  const [total, setTotal] = useState(base);
  const [run, setRun] = useState(false);
  const [picked, setPicked] = useState("");

  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRun(false);
          playBell();
          return 0;
        }
        playTick();
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [run]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const namesAr = (section === "girls" ? girlsAr : boysAr) as string[];
  const namesEn = (section === "girls" ? girlsEn : boysEn) as string[];
  const pool = roster.length
    ? roster.map((s) => (lang === "ar" ? s.nameAr : s.nameEn))
    : (lang === "ar" ? namesAr : namesEn);

  function drawName() {
    const name = pool[Math.floor(Math.random() * pool.length)];
    setPicked(name);
  }

  const voiceLabels = [tx(lang, "silence"), tx(lang, "whisper"), tx(lang, "table"), tx(lang, "speaker")];
  const gender = resolveTtsGender(section, ttsVoice);
  const caption = voiceCaption(lang, gender);
  const narratorModes: TtsVoice[] = ["auto", "male", "female"];
  const narratorLabel: Record<TtsVoice, string> = {
    auto: tx(lang, "voiceAuto"),
    male: tx(lang, "voiceMale"),
    female: tx(lang, "voiceFemale"),
  };
  const sampleAr =
    section === "girls"
      ? "السلام عليكن يا بطلات. نحن فارسات القيم، ونرتقي بالإحسان كل يوم في مدارس جدة الخاصة العالمية."
      : "السلام عليكم يا أبطال. نحن فرسان القيم، ونرتقي بالإحسان كل يوم في مدارس جدة الخاصة العالمية.";
  const sampleEn =
    section === "girls"
      ? "Peace be upon you, champions. We are Fursan Al-Qiyam, and we rise with Ihsan every day at Jeddah Private International School."
      : "Peace be upon you, champions. We are Fursan Al-Qiyam, and we rise with Ihsan every day at Jeddah Private International School.";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="font-display text-lg font-semibold">{tx(lang, "timer")}</h3>
        <p className="tabular mt-4 font-display text-5xl tracking-tight">
          {mm}:{ss}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => setRun(!run)}>{run ? tx(lang, "pauseTimer") : tx(lang, "startTimer")}</Button>
          <Button
            variant="outline"
            onClick={() => {
              setRun(false);
              setSeconds(total);
            }}
          >
            {tx(lang, "reset")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSeconds((s) => s + 30);
              setTotal((t) => t + 30);
            }}
          >
            {tx(lang, "add30")}
          </Button>
          <Button variant="ghost" onClick={() => playBell()}>
            {tx(lang, "bell")}
          </Button>
        </div>
        <p className="mt-4 text-xs font-medium text-muted">{tx(lang, "presets")}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[30, 60, 90, 120].map((sec) => {
            const scaled = Math.round(sec * cfg.timerScale);
            return (
              <Button
                key={sec}
                size="sm"
                variant="outline"
                onClick={() => {
                  setRun(false);
                  setSeconds(scaled);
                  setTotal(scaled);
                }}
              >
                {scaled}s
              </Button>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">{tx(lang, "voice")}</h3>
          <ListenButton
            variant="icon"
            aria={tx(lang, "voice")}
            ar={joinSpeak([tx("ar", "voice"), ...VOICE_COPY.map((v) => v.ar)])}
            en={joinSpeak([tx("en", "voice"), ...VOICE_COPY.map((v) => v.en)])}
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {voiceLabels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setVoice(i)}
              className={`rounded-lg p-3 text-center text-xs font-medium ${voice === i ? "bg-primary text-primary-fg" : "bg-paper"}`}
            >
              <span className="tabular block text-lg">{i}</span>
              {label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">{VOICE_COPY[voice][lang]}</p>
      </section>

      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="font-display text-lg font-semibold">{tx(lang, "narrator")}</h3>
        <p className="mt-1 text-sm text-muted">{tx(lang, "narratorHint")}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {narratorModes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setTtsVoice(mode)}
              className={`rounded-lg p-3 text-center text-xs font-medium ${ttsVoice === mode ? "bg-primary text-primary-fg" : "bg-paper"}`}
            >
              {narratorLabel[mode]}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm">
          {caption.name} · {caption.locale}
        </p>
        <div className="mt-3">
          <ListenButton ar={sampleAr} en={sampleEn} />
        </div>
      </section>

      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{tx(lang, "squads")}</h3>
          <Button size="sm" variant="ghost" onClick={() => useApp.getState().resetSquads()}>
            {tx(lang, "reset")}
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          {squads.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg bg-paper px-3 py-2">
              <Dual ar={s.nameAr} en={s.nameEn} className="text-sm font-medium" />
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="size-9" onClick={() => useApp.getState().changeSquad(s.id, -1)}>
                  −
                </Button>
                <span className="tabular w-6 text-center font-semibold">{s.stars}</span>
                <Button size="icon" variant="outline" className="size-9" onClick={() => useApp.getState().changeSquad(s.id, 1)}>
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h3 className="font-display text-lg font-semibold">{tx(lang, "pickStudent")}</h3>
        <p className="mt-6 font-display text-3xl font-semibold">{picked || "—"}</p>
        <Button className="mt-4" onClick={drawName}>
          {tx(lang, "pickStudent")}
        </Button>
        <h4 className="mt-6 text-sm font-medium">{tx(lang, "checklist")}</h4>
        <ul className="mt-2 space-y-2">
          {CHECKLIST.map((item) => {
            const key = `${todayISO()}:${item.id}`;
            const on = Boolean(checklist[key]);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => useApp.getState().toggleCheck(item.id)}
                  className={`w-full rounded-lg px-3 py-2 text-start text-sm ${on ? "bg-ok/10" : "bg-paper"}`}
                >
                  <Dual ar={item.textAr} en={item.textEn} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
