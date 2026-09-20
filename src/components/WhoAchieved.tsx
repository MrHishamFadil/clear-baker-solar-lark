import { Dual } from "@/components/Dual";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SKILLS } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { EMPTY_ROSTER, makeRosterKey, useApp } from "@/lib/store";
import { burstConfetti } from "@/lib/confetti";
import { playSuccess } from "@/lib/audio";

export function WhoAchieved() {
  const pending = useApp((s) => s.pendingCredit);
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const section = useApp((s) => s.section);
  const classId = useApp((s) => s.classId);
  const rosters = useApp((s) => s.rosters);
  const roster = rosters[makeRosterKey(grade, section, classId)] ?? EMPTY_ROSTER;
  const skill = SKILLS.find((s) => s.id === pending?.skillId);

  return (
    <Dialog open={Boolean(pending)} onOpenChange={(open) => !open && useApp.getState().clearPendingCredit()}>
      <DialogContent>
        <DialogTitle>{tx(lang, "whoAchieved")}</DialogTitle>
        <p className="mt-1 text-sm text-muted">{tx(lang, "whoAchievedHint")}</p>
        {skill ? (
          <Dual ar={skill.titleAr} en={skill.titleEn} as="p" className="mt-3 font-display text-lg font-semibold" />
        ) : null}
        {roster.length === 0 ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted">{tx(lang, "emptyRoster")}</p>
            <Button
              onClick={() => {
                useApp.getState().fillRoster();
              }}
            >
              {tx(lang, "fillThenAward")}
            </Button>
          </div>
        ) : (
          <ul className="mt-4 grid max-h-72 gap-2 overflow-y-auto">
            {roster.map((student) => (
              <li key={student.id}>
                <button
                  type="button"
                  className="flex h-12 w-full items-center rounded-lg bg-paper px-3 text-start text-sm font-medium hover:bg-crest/8"
                  onClick={() => {
                    if (!pending) return;
                    if (useApp.getState().sound) playSuccess();
                    burstConfetti();
                    useApp.getState().creditStudent(student.id, pending.skillId, pending.kind, { closeStudio: true });
                  }}
                >
                  {lang === "ar" ? student.nameAr : student.nameEn}
                </button>
              </li>
            ))}
          </ul>
        )}
        <Button className="mt-4" variant="ghost" onClick={() => useApp.getState().clearPendingCredit()}>
          {tx(lang, "skipAward")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
