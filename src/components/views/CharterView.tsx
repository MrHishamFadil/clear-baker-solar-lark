import { Crest } from "@/components/Crest";
import { Dual } from "@/components/Dual";
import { WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { CHARTER_POINTS, tx } from "@/lib/i18n";
import { gradeConfig } from "@/lib/content";
import { useApp } from "@/lib/store";

export function CharterView() {
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const section = useApp((s) => s.section);
  const cfg = gradeConfig(grade);

  return (
    <div className="space-y-4">
      <div className="no-print flex justify-end">
        <Button onClick={() => window.print()}>{tx(lang, "printCharter")}</Button>
      </div>
      <article className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-10">
        <div className="flex items-center gap-3">
          <Crest className="size-16 shrink-0" />
          <div>
            <p className="text-xs font-medium text-muted">{tx(lang, "school")}</p>
            <h2 className="font-display text-2xl font-semibold">{tx(lang, "brand")}</h2>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          {lang === "ar" ? cfg.nameAr : cfg.nameEn} · {section === "girls" ? tx(lang, "girls") : tx(lang, "boys")}
        </p>
        <WithSpeak
          className="mt-2"
          aria={tx(lang, "charterPledge")}
          ar={joinSpeak([tx("ar", "charterPledge"), ...CHARTER_POINTS.ar])}
          en={joinSpeak([tx("en", "charterPledge"), ...CHARTER_POINTS.en])}
        >
          <h3 className="font-display text-3xl font-semibold">{tx(lang, "charterPledge")}</h3>
        </WithSpeak>
        <ol className="mt-6 space-y-3">
          {CHARTER_POINTS.ar.map((ar, i) => (
            <li key={ar} className="flex gap-3 text-sm leading-relaxed">
              <span className="tabular text-crest">{String(i + 1).padStart(2, "0")}</span>
              <Dual ar={ar} en={CHARTER_POINTS.en[i]} />
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="h-px bg-border" />
            <p className="mt-2 text-xs text-muted">{tx(lang, "signTeacher")}</p>
          </div>
          <div>
            <div className="h-px bg-border" />
            <p className="mt-2 text-xs text-muted">{tx(lang, "signAdmin")}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
