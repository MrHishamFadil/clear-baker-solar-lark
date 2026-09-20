import { Dual } from "@/components/Dual";
import { ListenButton, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { ProgressRing } from "@/components/ProgressRing";
import { currentStage, IHSAN } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { todayISO } from "@/lib/utils";

export function IhsanView() {
  const lang = useApp((s) => s.lang);
  const score = useApp((s) => s.score);
  const marks = useApp((s) => s.streakMarks);
  const { current, next } = currentStage(score);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-crest p-6 text-primary-fg">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium opacity-80">{tx(lang, "stages")}</p>
          <WithSpeak
            tone="onDark"
            className="mt-1"
            aria={tx(lang, "stages")}
            ar={joinSpeak([current.nameAr, current.descAr])}
            en={joinSpeak([current.nameEn, current.descEn])}
          >
            <h2 className="font-display text-3xl font-semibold">{lang === "ar" ? current.nameAr : current.nameEn}</h2>
          </WithSpeak>
          <p className="mt-2 max-w-xl text-sm text-primary-fg/80">{lang === "ar" ? current.descAr : current.descEn}</p>
        </div>
        <ProgressRing value={score} max={next.target} label={tx(lang, "stars")} sub={`${tx(lang, "of")} ${next.target}`} />
      </header>

      <div className="grid gap-2">
        {IHSAN.stages.map((s) => {
          const reached = score >= s.minScore;
          return (
            <div key={s.stage} className={`rounded-xl p-4 shadow-[var(--shadow-border)] ${reached ? "bg-card" : "bg-paper"}`}>
              <WithSpeak ar={joinSpeak([s.nameAr, s.descAr])} en={joinSpeak([s.nameEn, s.descEn])} aria={s.nameAr}>
                <div className="flex items-center justify-between gap-3">
                  <Dual ar={s.nameAr} en={s.nameEn} className="font-medium" />
                  <span className="tabular text-xs text-muted">{s.minScore}–{s.maxScore}</span>
                </div>
              </WithSpeak>
              <Dual ar={s.descAr} en={s.descEn} as="p" className="mt-1 text-sm text-muted" />
            </div>
          );
        })}
      </div>

      <section>
        <h3 className="font-display text-lg font-semibold">{tx(lang, "streaks")}</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {IHSAN.streaks.items.map((item) => {
            const on = Boolean(marks[`${todayISO()}:${item.id}`]);
            return (
              <div
                key={item.id}
                className={`rounded-xl p-4 shadow-[var(--shadow-border)] ${on ? "bg-primary/10" : "bg-card"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <button type="button" className="min-w-0 flex-1 text-start" onClick={() => useApp.getState().toggleStreak(item.id)}>
                    <Dual ar={item.titleAr} en={item.titleEn} className="text-sm font-medium" />
                    <p className="mt-2 text-xs text-muted">
                      {item.targetDays} {lang === "ar" ? "أيام" : "days"}
                    </p>
                  </button>
                  <ListenButton variant="icon" ar={item.titleAr} en={item.titleEn} aria={item.titleAr} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-semibold">{tx(lang, "badges")}</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {IHSAN.badges.map((b, i) => {
            const unlocked = score >= [80, 160, 240, 320, 400, 1000][i];
            return (
              <div key={b.id} className={`rounded-xl p-4 ${unlocked ? "bg-card" : "bg-paper opacity-70"} shadow-[var(--shadow-border)]`}>
                <WithSpeak ar={joinSpeak([b.titleAr, b.descAr])} en={joinSpeak([b.titleEn, b.descEn])} aria={b.titleAr}>
                  <Dual ar={b.titleAr} en={b.titleEn} className="font-medium" />
                </WithSpeak>
                <Dual ar={b.descAr} en={b.descEn} as="p" className="mt-1 text-sm text-muted" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
