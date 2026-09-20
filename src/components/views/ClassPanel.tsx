import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Medal, Star, X } from "lucide-react";
import { CertificateCard } from "@/components/CertificateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { burstConfetti } from "@/lib/confetti";
import { playSuccess } from "@/lib/audio";
import { CLASSES, SKILLS } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { isSkillMastered, masteryTier, medalsFor, printHonorReport } from "@/lib/rewards";
import { EMPTY_OBS, EMPTY_ROSTER, makeRosterKey, useApp } from "@/lib/store";

export function ClassPanel() {
  const open = useApp((s) => s.classPanelOpen);
  const setOpen = useApp((s) => s.setClassPanel);
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const section = useApp((s) => s.section);
  const classId = useApp((s) => s.classId);
  const rosters = useApp((s) => s.rosters);
  const observations = useApp((s) => s.observations);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [skillId, setSkillId] = useState(SKILLS[0].id);
  const [tab, setTab] = useState<"observe" | "honor" | "cert">("honor");
  const [honorMode, setHonorMode] = useState<"overall" | "skill">("overall");
  const classes = CLASSES[String(grade)] || [];
  const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
  const selected = roster.find((s) => s.id === studentId) ?? roster[0];
  const obsKey = selected ? `${makeRosterKey(grade, section, classId)}:${selected.id}:${skillId}` : "";
  const obs = (obsKey && observations[obsKey]) || EMPTY_OBS;
  const skill = SKILLS.find((s) => s.id === skillId) ?? SKILLS[0];
  const criteria = lang === "ar" ? skill.successCriteriaAr : skill.successCriteriaEn;
  const prefix = makeRosterKey(grade, section, classId) + ":";

  const totals = useMemo(() => {
    return roster
      .map((student) => {
        let stars = 0;
        let mastered = 0;
        let skillStars = 0;
        let skillMastered = false;
        for (const [key, item] of Object.entries(observations)) {
          if (!key.startsWith(prefix + student.id)) continue;
          stars += item.stars;
          if (isSkillMastered(item)) mastered += 1;
          if (key.endsWith(`:${skillId}`)) {
            skillStars = item.stars;
            skillMastered = isSkillMastered(item);
          }
        }
        return { student, stars, mastered, skillStars, skillMastered };
      })
      .sort((a, b) =>
        honorMode === "skill"
          ? b.skillStars - a.skillStars || Number(b.skillMastered) - Number(a.skillMastered)
          : b.stars - a.stars || b.mastered - a.mastered,
      );
  }, [roster, observations, prefix, skillId, honorMode]);

  const top = totals[0];
  const classStars = totals.reduce((n, t) => n + t.stars, 0);
  const classMastered = totals.reduce((n, t) => n + t.mastered, 0);
  const evaluated = totals.filter((t) => t.stars > 0 || t.mastered > 0).length;
  const csv = useMemo(() => {
    const rows = [["name", "stars", "mastered"]];
    totals.forEach((t) =>
      rows.push([lang === "ar" ? t.student.nameAr : t.student.nameEn, String(t.stars), String(t.mastered)]),
    );
    return rows.map((r) => r.join(",")).join("\n");
  }, [totals, lang]);

  function grant(id: string, kind: "star" | "mastery") {
    if (useApp.getState().sound) playSuccess();
    burstConfetti();
    useApp.getState().creditStudent(id, skillId, kind);
    setStudentId(id);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed inset-y-0 end-0 z-50 flex w-[min(100vw,640px)] flex-col overflow-y-auto bg-card p-5 shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-xl font-semibold">{tx(lang, "honorRoll")}</Dialog.Title>
            <Dialog.Close className="inline-flex size-10 items-center justify-center rounded-md hover:bg-crest/8">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <p className="mt-1 text-xs text-muted">{tx(lang, "privacy")}</p>

          {classes.length ? (
            <select
              className="mt-3 h-11 rounded-md bg-paper px-3 text-sm"
              value={classId}
              onChange={(e) => useApp.getState().setClassId(e.target.value)}
            >
              <option value="">{tx(lang, "allClasses")}</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : null}

          <div className="mt-3 flex gap-1">
            {(["honor", "observe", "cert"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`h-10 flex-1 rounded-md text-xs font-medium ${tab === t ? "bg-primary text-primary-fg" : "bg-paper"}`}
              >
                {t === "observe" ? tx(lang, "rewards") : t === "honor" ? tx(lang, "honorRoll") : tx(lang, "certificate")}
              </button>
            ))}
          </div>

          {tab === "observe" ? (
            <div className="mt-4 space-y-3">
              <div className="flex gap-2">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={tx(lang, "namePlaceholder")} />
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (!name.trim()) return;
                    useApp.getState().addStudent(name.trim());
                    setName("");
                  }}
                >
                  {tx(lang, "addStudent")}
                </Button>
              </div>
              <Button variant="outline" onClick={() => useApp.getState().fillRoster()}>
                {tx(lang, "randomRoster")}
              </Button>
              {roster.length === 0 ? (
                <p className="text-sm text-muted">{tx(lang, "emptyRoster")}</p>
              ) : (
                <>
                  <label className="text-xs font-medium text-muted">{tx(lang, "selectStudent")}</label>
                  <select
                    className="h-11 w-full rounded-md bg-paper px-3 text-sm"
                    value={selected?.id}
                    onChange={(e) => setStudentId(e.target.value)}
                  >
                    {roster.map((s) => (
                      <option key={s.id} value={s.id}>
                        {lang === "ar" ? s.nameAr : s.nameEn}
                      </option>
                    ))}
                  </select>
                  <label className="text-xs font-medium text-muted">{tx(lang, "selectSkill")}</label>
                  <select
                    className="h-11 w-full rounded-md bg-paper px-3 text-sm"
                    value={skillId}
                    onChange={(e) => setSkillId(e.target.value)}
                  >
                    {SKILLS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {lang === "ar" ? s.titleAr : s.titleEn}
                      </option>
                    ))}
                  </select>
                  {selected ? (
                    <>
                      <p className="text-sm">
                        {tx(lang, "stars")}: <span className="tabular font-semibold">{obs.stars}</span>
                        {obs.mastered ? ` · ${tx(lang, "mastered")}` : ""}
                      </p>
                      <ul className="space-y-1">
                        {criteria.map((c, i) => (
                          <li key={c}>
                            <label className="flex gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={Boolean(obs.criteria[i])}
                                onChange={(e) => {
                                  const next = [...obs.criteria];
                                  next[i] = e.target.checked;
                                  useApp.getState().saveObs(selected.id, skillId, { criteria: next });
                                }}
                              />
                              {c}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <Textarea
                        value={obs.notes}
                        onChange={(e) => useApp.getState().saveObs(selected.id, skillId, { notes: e.target.value })}
                        placeholder={tx(lang, "notes")}
                      />
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => grant(selected.id, "star")}>
                          <Star className="size-4" /> {tx(lang, "awardStar")}
                        </Button>
                        <Button variant="secondary" onClick={() => grant(selected.id, "mastery")}>
                          <Medal className="size-4" /> {tx(lang, "awardMastery")}
                        </Button>
                        <Button variant="ghost" onClick={() => useApp.getState().resetStudentSkill(selected.id, skillId)}>
                          {tx(lang, "resetStars")}
                        </Button>
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
          ) : null}

          {tab === "honor" ? (
            <div className="honor-sheet mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Metric label={tx(lang, "evaluated")} value={`${evaluated} / ${totals.length || 0}`} />
                <Metric label={tx(lang, "totalStarsAwarded")} value={classStars} />
                <Metric label={tx(lang, "honorMetricsMastered")} value={classMastered} />
                <Metric
                  label={tx(lang, "topAchiever")}
                  value={top && top.stars > 0 ? (lang === "ar" ? top.student.nameAr : top.student.nameEn) : "—"}
                />
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setHonorMode("overall")}
                  className={`h-10 flex-1 rounded-md text-xs font-medium ${honorMode === "overall" ? "bg-primary text-primary-fg" : "bg-paper"}`}
                >
                  {tx(lang, "overallHonor")}
                </button>
                <button
                  type="button"
                  onClick={() => setHonorMode("skill")}
                  className={`h-10 flex-1 rounded-md text-xs font-medium ${honorMode === "skill" ? "bg-primary text-primary-fg" : "bg-paper"}`}
                >
                  {tx(lang, "bySkill")}
                </button>
              </div>
              {honorMode === "skill" ? (
                <select
                  className="h-11 w-full rounded-md bg-paper px-3 text-sm"
                  value={skillId}
                  onChange={(e) => setSkillId(e.target.value)}
                >
                  {SKILLS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === "ar" ? s.titleAr : s.titleEn}
                    </option>
                  ))}
                </select>
              ) : null}

              {totals.length === 0 ? (
                <p className="text-sm text-muted">{tx(lang, "noChampionsYet")}</p>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {(() => {
                      const podium = totals.filter((t) => (honorMode === "skill" ? t.skillStars : t.stars) > 0).slice(0, 3);
                      return [podium[1], podium[0], podium[2]].map((t, i) => {
                        const place = i === 1 ? 1 : i === 0 ? 2 : 3;
                        if (!t) return <div key={place} />;
                        const medal = ["", "🥇", "🥈", "🥉"][place];
                        return (
                          <button
                            key={t.student.id}
                            type="button"
                            onClick={() => useApp.getState().showCertificate(t.student.id, skillId)}
                            className={`rounded-xl p-3 text-center shadow-[var(--shadow-border)] ${place === 1 ? "bg-crest text-primary-fg" : "bg-paper"} ${place === 1 ? "mt-0" : "mt-4"}`}
                          >
                            <p className="text-base">{medal}</p>
                            <p className="mt-1 truncate text-sm font-semibold">{lang === "ar" ? t.student.nameAr : t.student.nameEn}</p>
                            <p className="tabular mt-1 text-xs">
                              {honorMode === "skill" ? t.skillStars : t.stars} ★
                            </p>
                          </button>
                        );
                      });
                    })()}
                  </div>
                  <div className="overflow-x-auto rounded-xl bg-paper">
                    <table className="w-full min-w-[28rem] text-start text-xs">
                      <thead>
                        <tr className="text-muted">
                          <th className="p-2 text-center">{tx(lang, "rank")}</th>
                          <th className="p-2">{tx(lang, "selectStudent")}</th>
                          <th className="p-2 text-center">{tx(lang, "stars")}</th>
                          <th className="p-2 text-center">{tx(lang, "mastered")}</th>
                          <th className="p-2 text-center">{tx(lang, "masteryTier")}</th>
                          <th className="p-2 text-center">{tx(lang, "certificate")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {totals.map((t, i) => {
                          const starsShown = honorMode === "skill" ? t.skillStars : t.stars;
                          const tier = masteryTier(t.mastered, t.stars);
                          const earned = medalsFor(t.stars, t.mastered);
                          return (
                            <tr key={t.student.id} className="border-t border-border">
                              <td className="p-2 text-center tabular">
                                {t.stars > 0 && i === 0 ? "🥇" : t.stars > 0 && i === 1 ? "🥈" : t.stars > 0 && i === 2 ? "🥉" : i + 1}
                              </td>
                              <td className="p-2">
                                <p className="font-medium">{lang === "ar" ? t.student.nameAr : t.student.nameEn}</p>
                                {earned.length ? (
                                  <p className="mt-0.5 text-[10px] text-crest">
                                    {earned.map((m) => (lang === "ar" ? m.titleAr : m.titleEn)).join(" · ")}
                                  </p>
                                ) : null}
                              </td>
                              <td className="tabular p-2 text-center font-semibold">{starsShown}</td>
                              <td className="tabular p-2 text-center">
                                {t.mastered} / {SKILLS.length}
                              </td>
                              <td className="p-2 text-center">
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                    tier.tone === "ok"
                                      ? "bg-primary/15 text-crest"
                                      : tier.tone === "mid"
                                        ? "bg-paper text-fg"
                                        : "bg-card text-muted"
                                  }`}
                                >
                                  {lang === "ar" ? tier.ar : tier.en}
                                </span>
                              </td>
                              <td className="p-2 text-center">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="no-print"
                                  onClick={() => useApp.getState().showCertificate(t.student.id, skillId)}
                                >
                                  {tx(lang, "certificate")}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <div className="no-print flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (top && top.stars > 0) useApp.getState().showCertificate(top.student.id, skillId);
                  }}
                >
                  {tx(lang, "printTopCert")}
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    playSuccess();
                    const sheet = e.currentTarget.closest(".honor-sheet") as HTMLElement | null;
                    printHonorReport(sheet);
                  }}
                >
                  {tx(lang, "printHonor")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "honor-roll.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  {tx(lang, "exportCsv")}
                </Button>
              </div>
            </div>
          ) : null}

          {tab === "cert" ? (
            <div className="mt-4 space-y-4">
              {roster.length > 1 ? (
                <select
                  className="h-11 w-full rounded-md bg-paper px-3 text-sm"
                  value={selected?.id || ""}
                  onChange={(e) => setStudentId(e.target.value)}
                >
                  {roster.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === "ar" ? s.nameAr : s.nameEn}
                    </option>
                  ))}
                </select>
              ) : null}
              {!selected ? (
                <p className="text-sm text-muted">{tx(lang, "noChampionsYet")}</p>
              ) : (
                <CertificateCard
                  student={selected}
                  skillId={honorMode === "skill" ? skillId : undefined}
                  stars={totals.find((t) => t.student.id === selected.id)?.stars || 0}
                  mastered={totals.find((t) => t.student.id === selected.id)?.mastered || 0}
                  actions
                />
              )}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-paper p-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
