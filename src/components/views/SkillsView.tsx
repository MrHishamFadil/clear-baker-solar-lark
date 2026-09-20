import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Dual } from "@/components/Dual";
import { ListenButton, joinSpeak } from "@/components/ListenButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SKILLS, VALUES } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { todayISO } from "@/lib/utils";
import type { ActionKind } from "@/lib/types";

const KINDS: ActionKind[] = ["play", "practise", "partner", "group", "mission", "reflect", "mastery"];

export function SkillsView() {
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const openStudio = useApp((s) => s.openStudio);
  const completed = useApp((s) => s.completed);
  const [q, setQ] = useState("");
  const [value, setValue] = useState("all");
  const cfgNote = grade <= 3;
  const isJunior = grade <= 3;

  const list = useMemo(() => {
    return SKILLS.filter((s) => {
      const hay = `${s.titleAr} ${s.titleEn} ${s.taglineAr} ${s.taglineEn} ${s.jpisValue}`.toLowerCase();
      const matchQ = !q || hay.includes(q.toLowerCase());
      const matchV = value === "all" || s.jpisValue.toLowerCase().startsWith(value);
      return matchQ && matchV;
    });
  }, [q, value]);

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            {lang === "ar" ? "المهارات العشر" : "Ten essential skills"}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            {cfgNote
              ? lang === "ar"
                ? "نمط الصفوف الأولية: خطوات أقصر، قراءة جهرية، وخيارات أوضح."
                : "Junior mode: shorter steps, read-aloud, and clearer choices."
              : lang === "ar"
                ? "كل مهارة استوديو تفاعلي: لعب، تدريب، شريك، مهمة، تأمل، وإتقان."
                : "Each skill is a live studio: play, practise, partner, mission, reflect, mastery."}
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-3 start-3 size-4 text-muted" />
          <Input className="ps-9" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx(lang, "search")} />
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setValue("all")}
          className={`h-10 rounded-full px-3 text-xs font-medium ${value === "all" ? "bg-primary text-primary-fg" : "bg-crest/8 text-crest"}`}
        >
          {lang === "ar" ? "الكل" : "All"}
        </button>
        {VALUES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setValue(v.id)}
            className={`h-10 rounded-full px-3 text-xs font-medium ${value === v.id ? "bg-primary text-primary-fg" : "bg-crest/8 text-crest"}`}
          >
            {lang === "ar" ? v.nameAr : v.nameEn}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((skill, idx) => {
          const done = KINDS.filter((k) => completed[`${todayISO()}:${skill.id}:${k}`]).length;
          const objectiveAr = isJunior ? skill.juniorObjectiveAr : skill.learningObjectiveAr;
          const objectiveEn = isJunior ? skill.juniorObjectiveEn : skill.learningObjectiveEn;
          const criteriaAr = isJunior ? skill.juniorCriteriaAr : skill.successCriteriaAr;
          const criteriaEn = isJunior ? skill.juniorCriteriaEn : skill.successCriteriaEn;
          return (
            <article
              key={skill.id}
              className="rounded-xl bg-card p-4 text-start shadow-[var(--shadow-border)] transition-[transform] duration-150 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <button type="button" className="min-w-0 flex-1 text-start" onClick={() => openStudio(skill.id)}>
                  <span className="tabular text-xs font-medium text-muted">{String(idx + 1).padStart(2, "0")}</span>
                  <Dual ar={skill.titleAr} en={skill.titleEn} as="h3" className="font-display mt-1 text-lg font-semibold" />
                </button>
                <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
                  <ListenButton
                    variant="icon"
                    aria={tx(lang, "listenObjective")}
                    ar={joinSpeak([skill.titleAr, skill.taglineAr, tx("ar", "objective"), objectiveAr])}
                    en={joinSpeak([skill.titleEn, skill.taglineEn, tx("en", "objective"), objectiveEn])}
                  />
                  <ListenButton
                    variant="icon"
                    aria={tx(lang, "listenCriteria")}
                    ar={joinSpeak([tx("ar", "criteria"), ...criteriaAr])}
                    en={joinSpeak([tx("en", "criteria"), ...criteriaEn])}
                  />
                  <Badge>{lang === "ar" ? skill.jpisValueAr : skill.jpisValue}</Badge>
                </div>
              </div>
              <button type="button" className="mt-2 w-full text-start" onClick={() => openStudio(skill.id)}>
                <Dual ar={skill.taglineAr} en={skill.taglineEn} as="p" className="text-sm text-muted" />
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[11px] text-muted">
                    <span>{tx(lang, "progress")}</span>
                    <span className="tabular">
                      {done} {tx(lang, "of")} 7
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border">
                    <div className="h-full bg-primary" style={{ width: `${(done / 7) * 100}%` }} />
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
