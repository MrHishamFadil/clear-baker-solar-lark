import { useState } from "react";
import { Dual } from "@/components/Dual";
import { SpeakHeading, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { burstConfetti } from "@/lib/confetti";
import { VALUES } from "@/lib/content";
import { playError, playSuccess } from "@/lib/audio";
import { tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export function ValuesView() {
  const lang = useApp((s) => s.lang);
  const [active, setActive] = useState(VALUES[0].id);
  const [picked, setPicked] = useState<number | null>(null);
  const value = VALUES.find((v) => v.id === active) ?? VALUES[0];
  const options = lang === "ar" ? value.scenarioGame.optionsAr : value.scenarioGame.optionsEn;

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">{tx(lang, "valuesSuite")}</p>
        <h2 className="font-display mt-1 text-2xl font-semibold">{tx(lang, "liveIt")}</h2>
      </header>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {VALUES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => {
              setActive(v.id);
              setPicked(null);
            }}
            className={`h-11 shrink-0 rounded-full px-4 text-sm font-medium ${active === v.id ? "bg-primary text-primary-fg" : "bg-card text-fg shadow-[var(--shadow-border)]"}`}
          >
            {lang === "ar" ? v.nameAr : v.nameEn}
          </button>
        ))}
      </div>

      <article className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <WithSpeak
          ar={joinSpeak([value.nameAr, value.definitionAr])}
          en={joinSpeak([value.nameEn, value.definitionEn])}
          aria={tx(lang, "listenSection")}
        >
          <Dual ar={value.nameAr} en={value.nameEn} as="h3" className="font-display text-2xl font-semibold" />
        </WithSpeak>
        <Dual ar={value.definitionAr} en={value.definitionEn} as="p" className="mt-3 text-sm leading-relaxed" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-paper p-3">
            <SpeakHeading
              title={tx(lang, "hadith")}
              ar={joinSpeak([tx("ar", "hadith"), value.quranHadithAr])}
              en={joinSpeak([tx("en", "hadith"), value.quranHadithEn])}
            />
            <Dual ar={value.quranHadithAr} en={value.quranHadithEn} as="p" className="text-sm" />
          </div>
          <div className="rounded-lg bg-paper p-3">
            <SpeakHeading
              title={tx(lang, "pyp")}
              ar={joinSpeak([tx("ar", "pyp"), value.pypLinkAr])}
              en={joinSpeak([tx("en", "pyp"), value.pypLinkEn])}
            />
            <Dual ar={value.pypLinkAr} en={value.pypLinkEn} as="p" className="text-sm" />
          </div>
        </div>

        <div className="mt-6">
          <WithSpeak
            ar={joinSpeak([
              value.scenarioGame.titleAr,
              value.scenarioGame.contextAr,
              ...value.scenarioGame.optionsAr.map((o) => o.text),
            ])}
            en={joinSpeak([
              value.scenarioGame.titleEn,
              value.scenarioGame.contextEn,
              ...value.scenarioGame.optionsEn.map((o) => o.text),
            ])}
            aria={tx(lang, "listenSection")}
          >
            <Dual ar={value.scenarioGame.titleAr} en={value.scenarioGame.titleEn} as="h4" className="font-medium" />
          </WithSpeak>
          <Dual ar={value.scenarioGame.contextAr} en={value.scenarioGame.contextEn} as="p" className="mt-2 text-sm text-muted" />
          <div className="mt-3 grid gap-2">
            {options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPicked(i);
                  if (opt.correct) {
                    playSuccess();
                    burstConfetti();
                    useApp.getState().addScore(8);
                    toast.success(tx(lang, "correct"));
                  } else {
                    playError();
                    toast.message(tx(lang, "rethink"));
                  }
                }}
                className={`rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${
                  picked === i ? (opt.correct ? "bg-ok/10" : "bg-danger/10") : "bg-paper"
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
          {picked !== null ? <p className="mt-3 text-sm text-muted">{options[picked].feedback}</p> : null}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-paper p-3">
            <SpeakHeading
              title={tx(lang, "partner")}
              ar={joinSpeak([value.pairTask.titleAr, value.pairTask.instructionAr])}
              en={joinSpeak([value.pairTask.titleEn, value.pairTask.instructionEn])}
            />
            <Dual ar={value.pairTask.titleAr} en={value.pairTask.titleEn} className="mt-1 text-sm font-medium" />
            <Dual ar={value.pairTask.instructionAr} en={value.pairTask.instructionEn} as="p" className="mt-1 text-xs text-muted" />
          </div>
          <div className="rounded-lg bg-paper p-3">
            <SpeakHeading
              title={tx(lang, "group")}
              ar={joinSpeak([value.groupChallenge.titleAr, value.groupChallenge.instructionAr])}
              en={joinSpeak([value.groupChallenge.titleEn, value.groupChallenge.instructionEn])}
            />
            <Dual ar={value.groupChallenge.titleAr} en={value.groupChallenge.titleEn} className="mt-1 text-sm font-medium" />
            <Dual ar={value.groupChallenge.instructionAr} en={value.groupChallenge.instructionEn} as="p" className="mt-1 text-xs text-muted" />
          </div>
          <div className="rounded-lg bg-paper p-3">
            <SpeakHeading
              title={tx(lang, "mission")}
              ar={joinSpeak([value.realLifeMission.titleAr, value.realLifeMission.taskAr])}
              en={joinSpeak([value.realLifeMission.titleEn, value.realLifeMission.taskEn])}
            />
            <Dual ar={value.realLifeMission.titleAr} en={value.realLifeMission.titleEn} className="mt-1 text-sm font-medium" />
            <Dual ar={value.realLifeMission.taskAr} en={value.realLifeMission.taskEn} as="p" className="mt-1 text-xs text-muted" />
          </div>
        </div>

        <ul className="mt-4 space-y-1">
          <SpeakHeading
            title={tx(lang, "reflect")}
            ar={joinSpeak(value.reflectionQuestionsAr)}
            en={joinSpeak(value.reflectionQuestionsEn)}
          />
          {(lang === "ar" ? value.reflectionQuestionsAr : value.reflectionQuestionsEn).map((q) => (
            <li key={q} className="text-sm text-muted">
              — {q}
            </li>
          ))}
        </ul>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => {
            useApp.getState().addScore(5);
            toast.success(tx(lang, "awarded") + " +5");
          }}
        >
          {tx(lang, "confirm")}
        </Button>
        <Badge className="ms-2">{tx(lang, "reflect")}</Badge>
      </article>
    </div>
  );
}
