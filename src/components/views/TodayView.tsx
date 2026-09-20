import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Dual } from "@/components/Dual";
import { ListenButton, SpeakHeading, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { ProgressRing } from "@/components/ProgressRing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentStage, featuredSkillIndex, gradeConfig, IHSAN, SKILLS } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { medalsFor, isSkillMastered } from "@/lib/rewards";
import { EMPTY_ROSTER, makeRosterKey, useApp } from "@/lib/store";
import { todayISO } from "@/lib/utils";

export function TodayView() {
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const score = useApp((s) => s.score);
  const openStudio = useApp((s) => s.openStudio);
  const setTab = useApp((s) => s.setTab);
  const completed = useApp((s) => s.completed);
  const section = useApp((s) => s.section);
  const classId = useApp((s) => s.classId);
  const rosters = useApp((s) => s.rosters);
  const observations = useApp((s) => s.observations);
  const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
  const prefix = makeRosterKey(grade, section, classId) + ":";
  const champions = roster
    .map((student) => {
      let stars = 0;
      let mastered = 0;
      for (const [key, item] of Object.entries(observations)) {
        if (!key.startsWith(prefix + student.id)) continue;
        stars += item.stars;
        if (item.mastered || isSkillMastered(item)) mastered += 1;
      }
      return { student, stars, mastered };
    })
    .filter((t) => t.stars > 0 || t.mastered > 0)
    .sort((a, b) => b.stars - a.stars || b.mastered - a.mastered)
    .slice(0, 3);
  const cfg = gradeConfig(grade);
  const skill = SKILLS[featuredSkillIndex()];
  const { current, next } = currentStage(score);
  const todayActions = Object.keys(completed).filter((k) => k.startsWith(todayISO())).length;
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const isJunior = grade <= 3;
  const objectiveAr = isJunior ? skill.juniorObjectiveAr : skill.learningObjectiveAr;
  const objectiveEn = isJunior ? skill.juniorObjectiveEn : skill.learningObjectiveEn;
  const criteriaAr = isJunior ? skill.juniorCriteriaAr : skill.successCriteriaAr;
  const criteriaEn = isJunior ? skill.juniorCriteriaEn : skill.successCriteriaEn;

  return (
    <div className="space-y-6">
      <section className="star-pattern overflow-hidden rounded-xl bg-crest p-6 text-primary-fg sm:p-8">
        <Badge className="bg-primary-fg/12 text-primary-fg">{tx(lang, "todayKicker")}</Badge>
        <WithSpeak
          tone="onDark"
          className="mt-3"
          aria={tx(lang, "todayKicker")}
          ar={joinSpeak([tx("ar", "todayKicker"), tx("ar", "todayTitle"), tx("ar", "ibLine"), cfg.nameAr, cfg.pedagogicalFocusAr])}
          en={joinSpeak([tx("en", "todayKicker"), tx("en", "todayTitle"), tx("en", "ibLine"), cfg.nameEn, cfg.pedagogicalFocusEn])}
        >
          <h1 className="font-display max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            {tx(lang, "todayTitle")}
          </h1>
        </WithSpeak>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-fg/80">{tx(lang, "ibLine")}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-primary-fg/10 px-3 py-1">{lang === "ar" ? cfg.nameAr : cfg.nameEn}</span>
          <span className="rounded-full bg-primary-fg/10 px-3 py-1">{lang === "ar" ? cfg.badgeAr : cfg.badgeEn}</span>
          <span className="rounded-full bg-primary-fg/10 px-3 py-1">{lang === "ar" ? cfg.cognitiveLevelAr : cfg.cognitiveLevelEn}</span>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">{tx(lang, "featuredSkill")}</p>
          <WithSpeak
            className="mt-2"
            aria={tx(lang, "featuredSkill")}
            ar={joinSpeak([skill.titleAr, skill.taglineAr])}
            en={joinSpeak([skill.titleEn, skill.taglineEn])}
          >
            <Dual ar={skill.titleAr} en={skill.titleEn} as="h2" className="font-display text-2xl font-semibold" />
          </WithSpeak>
          <Dual ar={skill.taglineAr} en={skill.taglineEn} as="p" className="mt-2 text-sm text-muted" />

          <div className="mt-4 rounded-lg bg-paper p-3">
            <SpeakHeading
              title={tx(lang, "objective")}
              ar={joinSpeak([tx("ar", "objective"), objectiveAr])}
              en={joinSpeak([tx("en", "objective"), objectiveEn])}
            />
            <Dual ar={objectiveAr} en={objectiveEn} as="p" className="text-sm leading-relaxed" />
          </div>

          <div className="mt-3">
            <SpeakHeading
              title={tx(lang, "criteria")}
              ar={joinSpeak([tx("ar", "criteria"), ...criteriaAr])}
              en={joinSpeak([tx("en", "criteria"), ...criteriaEn])}
            />
            <ul className="space-y-1">
              {criteriaAr.map((c, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted">
                  <Dual ar={c} en={criteriaEn[i] || c} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => openStudio(skill.id)}>
              {tx(lang, "startPractice")} <Arrow className="size-4" />
            </Button>
            <Button variant="outline" onClick={() => setTab("scenarios")}>
              {tx(lang, "caseOf")}
            </Button>
            <Button variant="ghost" onClick={() => setTab("wheel")}>
              {tx(lang, "spin")}
            </Button>
          </div>
        </article>

        <article className="flex items-center justify-between gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
          <ProgressRing
            value={score}
            max={next.target}
            label={lang === "ar" ? current.nameAr : current.nameEn}
            sub={`${tx(lang, "of")} ${next.target}`}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted">{tx(lang, "nextMilestone")}</p>
            <p className="font-display text-lg font-semibold">{lang === "ar" ? next.nameAr : next.nameEn}</p>
            <p className="mt-2 text-sm text-muted">
              {tx(lang, "actionsDone")}: <span className="tabular font-medium text-fg">{todayActions}</span>
            </p>
          </div>
        </article>
      </div>

      {champions.length ? (
        <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold">{tx(lang, "honorMetricsChampions")}</h2>
            <Button variant="ghost" size="sm" onClick={() => useApp.getState().setClassPanel(true)}>
              {tx(lang, "viewHonor")}
            </Button>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {champions.map((t, i) => {
              const medal = medalsFor(t.stars, t.mastered).at(-1);
              return (
                <button
                  key={t.student.id}
                  type="button"
                  onClick={() => useApp.getState().setClassPanel(true)}
                  className="rounded-lg bg-paper p-3 text-start"
                >
                  <p className="tabular text-xs text-muted">{i + 1}</p>
                  <p className="mt-1 font-medium">{lang === "ar" ? t.student.nameAr : t.student.nameEn}</p>
                  <p className="tabular mt-1 text-xs text-muted">
                    {t.stars} ★ · {t.mastered} {tx(lang, "mastered")}
                  </p>
                  {medal ? (
                    <p className="mt-2 text-xs text-crest">{lang === "ar" ? medal.titleAr : medal.titleEn}</p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        {IHSAN.streaks.items.map((item) => (
          <div key={item.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
            <div className="mb-2 flex items-center justify-between gap-2 text-crest">
              <button
                type="button"
                onClick={() => useApp.getState().toggleStreak(item.id)}
                className="inline-flex min-w-0 flex-1 items-center gap-2 text-start text-xs font-medium"
              >
                <Sparkles className="size-4 shrink-0" />
                {tx(lang, "streaks")}
              </button>
              <ListenButton variant="icon" ar={item.titleAr} en={item.titleEn} aria={item.titleAr} />
            </div>
            <button type="button" className="w-full text-start" onClick={() => useApp.getState().toggleStreak(item.id)}>
              <Dual ar={item.titleAr} en={item.titleEn} className="text-sm font-medium" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
