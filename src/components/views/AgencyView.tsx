import { useState } from "react";
import { SpeakHeading, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { burstConfetti } from "@/lib/confetti";
import { VALUES } from "@/lib/content";
import { playSuccess } from "@/lib/audio";
import { POLL_OPTIONS, tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export function AgencyView() {
  const lang = useApp((s) => s.lang);
  const votes = useApp((s) => s.pollVotes);
  const [rating, setRating] = useState(0);
  const [goal, setGoal] = useState("");
  const [valueId, setValueId] = useState(VALUES[0].id);
  const total = votes.reduce((a, b) => a + b, 0);
  const pollTitleAr = "أي روتين ساعد فصلنا اليوم؟";
  const pollTitleEn = "Which routine helped our class today?";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <SpeakHeading
          title={tx(lang, "poll")}
          ar={joinSpeak([pollTitleAr, ...POLL_OPTIONS.ar])}
          en={joinSpeak([pollTitleEn, ...POLL_OPTIONS.en])}
        />
        <WithSpeak ar={pollTitleAr} en={pollTitleEn} aria={tx(lang, "poll")}>
          <h3 className="font-display mt-1 text-xl font-semibold">
            {lang === "ar" ? pollTitleAr : pollTitleEn}
          </h3>
        </WithSpeak>
        <div className="mt-4 space-y-2">
          {POLL_OPTIONS[lang].map((opt, i) => {
            const pct = total ? Math.round((votes[i] / total) * 100) : 0;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => useApp.getState().castVote(i)}
                className="relative w-full overflow-hidden rounded-lg bg-paper p-3 text-start text-sm"
              >
                <span
                  className="absolute inset-y-0 start-0 bg-primary/12"
                  style={{ width: `${pct}%` }}
                />
                <span className="relative flex justify-between">
                  <span>{opt}</span>
                  <span className="tabular text-xs text-muted">
                    {pct}% · {votes[i]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <Button className="mt-3" variant="ghost" onClick={() => useApp.getState().resetPoll()}>
          {tx(lang, "resetPoll")}
        </Button>
      </section>

      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <SpeakHeading
          title={tx(lang, "checkout")}
          ar={joinSpeak([tx("ar", "rating"), tx("ar", "valueToday"), tx("ar", "goalTomorrow")])}
          en={joinSpeak([tx("en", "rating"), tx("en", "valueToday"), tx("en", "goalTomorrow")])}
        />
        <h3 className="font-display mt-1 text-xl font-semibold">{tx(lang, "rating")}</h3>
        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`size-11 rounded-md text-lg ${n <= rating ? "bg-primary text-primary-fg" : "bg-paper"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-medium">{tx(lang, "valueToday")}</label>
        <select
          className="mt-1 h-11 w-full rounded-md bg-paper px-3 text-sm"
          value={valueId}
          onChange={(e) => setValueId(e.target.value)}
        >
          {VALUES.map((v) => (
            <option key={v.id} value={v.id}>
              {lang === "ar" ? v.nameAr : v.nameEn}
            </option>
          ))}
        </select>
        <label className="mt-4 block text-sm font-medium">{tx(lang, "goalTomorrow")}</label>
        <Textarea className="mt-1" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <Button
          className="mt-4"
          onClick={() => {
            if (!goal.trim()) {
              toast.message(tx(lang, "goalTomorrow"));
              return;
            }
            useApp.getState().markCheckout();
            playSuccess();
            burstConfetti();
            toast.success(tx(lang, "awarded") + " +10");
            setGoal("");
          }}
        >
          {tx(lang, "submitTicket")}
        </Button>
      </section>
    </div>
  );
}
