import { useState } from "react";
import { Dual } from "@/components/Dual";
import { ListenButton, SpeakHeading, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { burstConfetti } from "@/lib/confetti";
import { SCENARIOS } from "@/lib/content";
import { playError, playSuccess } from "@/lib/audio";
import { adapt } from "@/lib/adapt";
import { tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export function ScenariosView() {
  const lang = useApp((s) => s.lang);
  const section = useApp((s) => s.section);
  const grade = useApp((s) => s.grade);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const sc = SCENARIOS[idx];
  const options = (lang === "ar" ? sc.optionsAr : sc.optionsEn).slice(0, grade <= 3 ? 2 : 3);
  const hero = section === "girls"
    ? lang === "ar" ? ["سارة", "نورة", "لولوة", "ريم", "لين"][idx % 5] : ["Sarah", "Noura", "Lulwah", "Reem", "Leen"][idx % 5]
    : lang === "ar" ? sc.character : sc.characterEn;

  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">{tx(lang, "caseOf")}</p>
        <h2 className="font-display text-2xl font-semibold">
          {lang === "ar" ? "ماذا يفعل بطلنا في هذا الموقف؟" : "What would our champion do?"}
        </h2>
      </header>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SCENARIOS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setIdx(i);
              setPicked(null);
            }}
            className={`h-10 shrink-0 rounded-full px-3 text-xs font-medium ${i === idx ? "bg-primary text-primary-fg" : "bg-card shadow-[var(--shadow-border)]"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <article className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge>
            {hero} · {idx + 1} / {SCENARIOS.length}
          </Badge>
          <ListenButton
            ar={joinSpeak([sc.titleAr, sc.contextAr, ...sc.optionsAr.map((o) => o.text)])}
            en={joinSpeak([sc.titleEn, sc.contextEn, ...sc.optionsEn.map((o) => o.text)])}
          />
        </div>
        <WithSpeak className="mt-3" ar={sc.titleAr} en={sc.titleEn} aria={tx(lang, "listenSection")}>
          <Dual ar={sc.titleAr} en={sc.titleEn} as="h3" className="font-display text-xl font-semibold" />
        </WithSpeak>
        <p className="mt-3 text-sm leading-relaxed">
          {adapt(lang === "ar" ? sc.contextAr : sc.contextEn, section)}
        </p>
        <div className="mt-4 grid gap-2">
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setPicked(i);
                if (opt.correct) {
                  playSuccess();
                  burstConfetti();
                  useApp.getState().addScore(10);
                  toast.success(tx(lang, "correct") + " +10");
                } else {
                  playError();
                  toast.message(tx(lang, "rethink"));
                }
              }}
              className={`rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${
                picked === i ? (opt.correct ? "bg-ok/10" : "bg-danger/10") : "bg-paper"
              }`}
            >
              <span className="me-2 inline-flex size-6 items-center justify-center rounded-md bg-card text-xs font-semibold">
                {lang === "ar" ? ["أ", "ب", "ج"][i] : ["A", "B", "C"][i]}
              </span>
              {adapt(opt.text, section)}
            </button>
          ))}
        </div>
        {picked !== null ? (
          <div className="mt-4 space-y-2 rounded-lg bg-paper p-3 text-sm">
            <SpeakHeading
              title={tx(lang, "hadith")}
              ar={joinSpeak([sc.optionsAr[picked]?.feedback, sc.hadithAnchorAr, sc.pypProfileAr])}
              en={joinSpeak([sc.optionsEn[picked]?.feedback, sc.hadithAnchorEn, sc.pypProfileEn])}
            />
            <p>{adapt(options[picked].feedback, section)}</p>
            <p className="text-muted">{lang === "ar" ? sc.hadithAnchorAr : sc.hadithAnchorEn}</p>
            <p className="text-xs text-crest">
              {tx(lang, "pyp")}: {lang === "ar" ? sc.pypProfileAr : sc.pypProfileEn}
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex justify-between">
          <Button variant="outline" disabled={idx === 0} onClick={() => { setIdx(idx - 1); setPicked(null); }}>
            {tx(lang, "previous")}
          </Button>
          <Button disabled={idx === SCENARIOS.length - 1} onClick={() => { setIdx(idx + 1); setPicked(null); }}>
            {tx(lang, "next")}
          </Button>
        </div>
      </article>
    </div>
  );
}
