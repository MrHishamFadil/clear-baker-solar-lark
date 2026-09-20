import { useEffect, useState } from "react";
import { Crest } from "@/components/Crest";
import { PrintOverlay } from "@/components/PrintOverlay";
import { Button } from "@/components/ui/button";
import { playBell, resumeAudio } from "@/lib/audio";
import { SKILLS, gradeConfig } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { printCertificate, saveCertificateFile } from "@/lib/rewards";
import { useApp } from "@/lib/store";
import type { Student } from "@/lib/types";
import { toast } from "sonner";

export function CertificateCard({
  student,
  skillId,
  stars,
  mastered,
  medal,
  actions,
}: {
  student: Student;
  skillId?: string;
  stars: number;
  mastered: number;
  medal?: { ar: string; en: string };
  actions?: boolean;
}) {
  const lang = useApp((s) => s.lang);
  const section = useApp((s) => s.section);
  const grade = useApp((s) => s.grade);
  const classId = useApp((s) => s.classId);
  const cfg = gradeConfig(grade);
  const skill = SKILLS.find((s) => s.id === skillId);
  const body = section === "girls" ? tx(lang, "certBodyGirl") : tx(lang, "certBodyBoy");
  const reason = section === "girls" ? tx(lang, "certReasonGirl") : tx(lang, "certReasonBoy");
  const knight = section === "girls" ? tx(lang, "knightGirl") : tx(lang, "knightBoy");
  const name = lang === "ar" ? student.nameAr : student.nameEn;
  const medalLabel = medal ? (lang === "ar" ? medal.ar : medal.en) : tx(lang, "certMedal");
  const shown = Math.min(Math.max(stars, 1), 5);
  const date = new Date().toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [preview, setPreview] = useState(false);

  const face = (
    <div className="rounded-xl border border-primary/25 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3 text-start">
          <Crest className="size-16 shrink-0 sm:size-20" />
          <div>
            <p className="text-[11px] font-medium tracking-wide text-muted">{tx(lang, "school")}</p>
            <p className="text-xs text-muted">{tx(lang, "certIb")}</p>
          </div>
        </div>
        <p className="text-[11px] font-semibold text-crest">{date}</p>
      </div>
      <p className="mt-5 text-center text-xs font-semibold tracking-wide text-crest">{tx(lang, "certMedal")}</p>
      <h3 className="font-display mt-1 text-center text-2xl font-semibold">{tx(lang, "certTitle")}</h3>
      <p className="mt-4 text-center text-sm leading-relaxed text-muted">{body}</p>
      <p className="mt-4 text-center text-xs text-muted">{knight}</p>
      <p className="font-display mt-1 text-center text-3xl font-semibold">{name}</p>
      <p className="mt-2 text-center text-xs text-muted">
        {lang === "ar" ? cfg.nameAr : cfg.nameEn}
        {classId ? ` · ${classId}` : ""} · {section === "girls" ? tx(lang, "girls") : tx(lang, "boys")}
      </p>
      {skill ? <p className="mt-3 text-center text-sm">{lang === "ar" ? skill.titleAr : skill.titleEn}</p> : null}
      <p className="mt-3 text-center text-sm leading-relaxed text-muted">{reason}</p>
      <p className="mt-4 text-center text-lg tracking-widest text-crest">{"★".repeat(shown)}</p>
      <p className="tabular mt-1 text-center text-xs text-muted">
        {stars} {tx(lang, "stars")} · {mastered} {tx(lang, "mastered")}
      </p>
      <p className="mt-3 text-center text-sm font-medium text-crest">{medalLabel}</p>
      <div className="mt-8 grid grid-cols-2 gap-6 text-start">
        <div>
          <div className="h-px bg-border" />
          <p className="mt-2 text-[11px] text-muted">{tx(lang, "signTeacher")}</p>
        </div>
        <div>
          <div className="h-px bg-border" />
          <p className="mt-2 text-[11px] text-muted">{tx(lang, "signAdmin")}</p>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!preview) return;
    const t = window.setTimeout(() => {
      const sheet = document.querySelector<HTMLElement>(".print-overlay .print-sheet");
      void printCertificate(sheet);
    }, 250);
    return () => window.clearTimeout(t);
  }, [preview]);

  return (
    <>
      <div className="print-sheet w-full min-w-0 rounded-xl border-2 border-primary/40 bg-card p-5 sm:p-8">
        {face}
        {actions ? (
          <Button
            type="button"
            className="no-print mt-6 w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              try {
                resumeAudio();
                playBell();
              } catch {
                /* audio optional */
              }
              toast.success(tx(lang, "printingNow"));
              setPreview(true);
            }}
          >
            {tx(lang, "printThisCert")}
          </Button>
        ) : null}
      </div>
      <PrintOverlay
        open={preview}
        onClose={() => setPreview(false)}
        onPrint={() => {
          const sheet = document.querySelector<HTMLElement>(".print-overlay .print-sheet");
          void printCertificate(sheet);
        }}
        onSave={() => {
          const sheet = document.querySelector<HTMLElement>(".print-overlay .print-sheet");
          void saveCertificateFile(sheet);
        }}
      >
        <div className="print-sheet w-full rounded-xl border-2 border-primary/40 bg-card p-5 sm:p-8">{face}</div>
      </PrintOverlay>
    </>
  );
}
