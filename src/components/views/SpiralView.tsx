import { useState } from "react";
import { Dual } from "@/components/Dual";
import { SpeakHeading, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { SPIRAL, WARMUPS } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export function SpiralView() {
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const [day, setDay] = useState(1);
  const [mode, setMode] = useState<"days" | "gen">("days");
  const [warmup, setWarmup] = useState(0);
  const d = SPIRAL.find((x) => x.day === day) ?? SPIRAL[0];
  const w = WARMUPS[warmup];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant={mode === "days" ? "default" : "outline"} onClick={() => setMode("days")}>
          {tx(lang, "orientation")}
        </Button>
        <Button variant={mode === "gen" ? "default" : "outline"} onClick={() => setMode("gen")}>
          {tx(lang, "warmup")}
        </Button>
      </div>

      {mode === "days" ? (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SPIRAL.map((item) => (
              <button
                key={item.day}
                type="button"
                onClick={() => setDay(item.day)}
                className={`h-10 shrink-0 rounded-full px-3 text-xs font-medium ${day === item.day ? "bg-primary text-primary-fg" : "bg-card shadow-[var(--shadow-border)]"}`}
              >
                {tx(lang, "day")} {item.day}
              </button>
            ))}
          </div>
          <article className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
            <p className="text-xs text-muted">{itemWeek(d.week, lang)}</p>
            <WithSpeak
              className="mt-1"
              aria={tx(lang, "listenSection")}
              ar={joinSpeak([d.titleAr, d.focusAr])}
              en={joinSpeak([d.titleEn, d.focusEn])}
            >
              <Dual ar={d.titleAr} en={d.titleEn} as="h2" className="font-display text-2xl font-semibold" />
            </WithSpeak>
            <Dual ar={d.focusAr} en={d.focusEn} as="p" className="mt-2 text-sm text-muted" />
            {d.quickWarmup ? (
              <div className="mt-4 rounded-lg bg-paper p-3">
                <SpeakHeading
                  title={tx(lang, "warmup")}
                  ar={joinSpeak([d.quickWarmup.titleAr, d.quickWarmup.promptAr])}
                  en={joinSpeak([d.quickWarmup.titleEn, d.quickWarmup.promptEn])}
                />
                <Dual ar={d.quickWarmup.titleAr} en={d.quickWarmup.titleEn} className="text-sm font-medium" />
                {d.quickWarmup.promptAr ? (
                  <Dual ar={d.quickWarmup.promptAr} en={d.quickWarmup.promptEn || ""} as="p" className="mt-1 text-sm text-muted" />
                ) : null}
              </div>
            ) : null}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Block title={tx(lang, "newSkills")} ar={d.newSkillsAr} en={d.newSkillsEn} />
              <Block title={tx(lang, "review")} ar={d.spiralReviewAr} en={d.spiralReviewEn} />
            </div>
            {d.physicalRehearsalAr ? (
              <div className="mt-3">
                <SpeakHeading
                  title={tx(lang, "rehearsal")}
                  ar={joinSpeak([tx("ar", "rehearsal"), d.physicalRehearsalAr])}
                  en={joinSpeak([tx("en", "rehearsal"), d.physicalRehearsalEn])}
                />
                <Dual ar={d.physicalRehearsalAr} en={d.physicalRehearsalEn || ""} as="p" className="text-sm" />
              </div>
            ) : null}
            {grade <= 3 && d.juniorNoteAr ? (
              <div className="mt-3 rounded-lg bg-crest/8 p-3 text-sm">
                <SpeakHeading
                  title={tx(lang, "juniorOn")}
                  ar={d.juniorNoteAr}
                  en={d.juniorNoteEn || ""}
                />
                <Dual ar={d.juniorNoteAr} en={d.juniorNoteEn || ""} />
              </div>
            ) : null}
          </article>
        </>
      ) : (
        <div className="space-y-3">
          <Button
            onClick={() => setWarmup(Math.floor(Math.random() * WARMUPS.length))}
          >
            {tx(lang, "rollWarmup")}
          </Button>
          <div className="grid gap-2 sm:grid-cols-2">
            {WARMUPS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWarmup(i)}
                className={`rounded-xl p-4 text-start shadow-[var(--shadow-border)] ${i === warmup ? "bg-primary/10" : "bg-card"}`}
              >
                <Dual ar={item.titleAr} en={item.titleEn} className="font-medium" />
                <p className="mt-1 text-xs text-muted">{item.duration}</p>
              </button>
            ))}
          </div>
          <article className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
            <WithSpeak ar={joinSpeak([w.titleAr, w.descAr])} en={joinSpeak([w.titleEn, w.descEn])} aria={tx(lang, "warmup")}>
              <Dual ar={w.titleAr} en={w.titleEn} as="h3" className="font-display text-xl font-semibold" />
            </WithSpeak>
            <Dual ar={w.descAr} en={w.descEn} as="p" className="mt-2 text-sm leading-relaxed" />
          </article>
        </div>
      )}
    </div>
  );
}

function itemWeek(week: number, lang: "ar" | "en") {
  return week === 2 ? (lang === "ar" ? "الأسبوع ٢" : "Week 2") : (lang === "ar" ? "الأسبوع ١" : "Week 1");
}

function Block({ title, ar, en }: { title: string; ar?: string[]; en?: string[] }) {
  if (!ar?.length) return null;
  return (
    <div className="rounded-lg bg-paper p-3">
      <SpeakHeading title={title} ar={joinSpeak([title, ...ar])} en={joinSpeak([title, ...(en || [])])} />
      <ul className="mt-2 space-y-1">
        {ar.map((item, i) => (
          <li key={item} className="text-sm">
            <Dual ar={item} en={en?.[i] || item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
