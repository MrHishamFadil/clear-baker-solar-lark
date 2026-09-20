import { CertificateCard } from "@/components/CertificateCard";
import { Dual } from "@/components/Dual";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SKILLS } from "@/lib/content";
import { medalsFor } from "@/lib/rewards";
import { tx } from "@/lib/i18n";
import { EMPTY_ROSTER, makeRosterKey, useApp } from "@/lib/store";

export function RewardMoment() {
  const celebration = useApp((s) => s.celebration);
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const section = useApp((s) => s.section);
  const classId = useApp((s) => s.classId);
  const rosters = useApp((s) => s.rosters);
  const observations = useApp((s) => s.observations);
  const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
  const student = roster.find((s) => s.id === celebration?.studentId);
  const skill = SKILLS.find((s) => s.id === celebration?.skillId);
  const prefix = makeRosterKey(grade, section, classId) + ":";
  let stars = 0;
  let mastered = 0;
  if (student) {
    for (const [key, obs] of Object.entries(observations)) {
      if (!key.startsWith(prefix + student.id)) continue;
      stars += obs.stars;
      if (obs.mastered) mastered += 1;
    }
  }
  const medals = medalsFor(stars, mastered);

  return (
    <Dialog open={Boolean(celebration && student)} onOpenChange={(open) => !open && useApp.getState().clearCelebration()}>
      <DialogContent wide className="z-[70]" overlayClassName="z-[70]">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">{tx(lang, "celebrateTitle")}</p>
        <DialogTitle className="mt-1">
          {student ? (lang === "ar" ? student.nameAr : student.nameEn) : tx(lang, "honorRoll")}
        </DialogTitle>
        {skill ? <Dual ar={skill.titleAr} en={skill.titleEn} as="p" className="mt-1 text-sm text-muted" /> : null}
        {celebration ? (
          <p className="mt-3 rounded-lg bg-crest/8 px-3 py-2 text-sm font-medium text-crest">
            {tx(lang, "medalEarned")}: {lang === "ar" ? celebration.medalAr : celebration.medalEn}
          </p>
        ) : null}
        {medals.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {medals.map((m) => (
              <span key={m.id} className="rounded-full bg-paper px-3 py-1 text-xs">
                {lang === "ar" ? m.titleAr : m.titleEn}
              </span>
            ))}
          </div>
        ) : null}
        {student ? (
          <div className="mt-5">
            <CertificateCard
              student={student}
              skillId={celebration?.skillId}
              stars={stars}
              mastered={mastered}
              medal={celebration ? { ar: celebration.medalAr, en: celebration.medalEn } : undefined}
              actions
            />
          </div>
        ) : null}
        <div className="no-print mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              useApp.getState().clearCelebration();
              useApp.getState().setClassPanel(true);
            }}
          >
            {tx(lang, "viewHonor")}
          </Button>
          <Button variant="ghost" onClick={() => useApp.getState().clearCelebration()}>
            {tx(lang, "close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
