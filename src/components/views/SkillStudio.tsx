import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Dual } from "@/components/Dual";
import { ListenButton, SpeakHeading, WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { burstConfetti } from "@/lib/confetti";
import { SKILLS, VALUES, type Skill } from "@/lib/content";
import { tx } from "@/lib/i18n";
import { playError, playSuccess, playTone } from "@/lib/audio";
import { useApp } from "@/lib/store";
import { shuffle } from "@/lib/utils";
import type { ActionKind } from "@/lib/types";
import { toast } from "sonner";

const KINDS: ActionKind[] = ["play", "practise", "partner", "group", "mission", "reflect", "mastery"];

function credit(skillId: string, kind: ActionKind, lang: "ar" | "en") {
  const sound = useApp.getState().sound;
  const { ok, points } = useApp.getState().completeAction(skillId, kind);
  if (ok) {
    if (sound) playSuccess();
    burstConfetti();
    toast.success(tx(lang, "awarded") + ` +${points}`);
    if (kind === "mastery" || kind === "mission") {
      useApp.getState().askWhoAchieved(skillId, kind === "mastery" ? "mastery" : "star");
    }
  } else {
    if (sound) playTone(380, "triangle", 0.1, 0.06);
    toast.message(tx(lang, "alreadyDone"));
    if (kind === "mastery") {
      useApp.getState().askWhoAchieved(skillId, "mastery");
    }
  }
}

function SequenceGame({ skill }: { skill: Skill }) {
  const lang = useApp((s) => s.lang);
  const steps = skill.minigame.steps ?? [];
  const [order, setOrder] = useState(() => shuffle(steps.map((_, i) => i)));
  const [result, setResult] = useState<"idle" | "ok" | "bad">("idle");

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
    setResult("idle");
  }

  function check() {
    const ok = order.every((orig, i) => orig === i);
    setResult(ok ? "ok" : "bad");
    if (ok) credit(skill.id, "play", lang);
    else if (useApp.getState().sound) playError();
  }

  return (
    <div className="space-y-3">
      <WithSpeak
        ar={joinSpeak([skill.minigame.instructionAr || skill.minigame.titleAr, ...(steps.map((s) => s.textAr))])}
        en={joinSpeak([skill.minigame.instructionEn || skill.minigame.titleEn, ...(steps.map((s) => s.textEn))])}
        aria={tx(lang, "listenSection")}
      >
        <Dual
          ar={skill.minigame.instructionAr || skill.minigame.titleAr}
          en={skill.minigame.instructionEn || skill.minigame.titleEn}
          as="p"
          className="text-sm text-muted"
        />
      </WithSpeak>
      <ol className="space-y-2">
        {order.map((orig, i) => {
          const step = steps[orig];
          return (
            <li
              key={step.id}
              className="flex items-center gap-2 rounded-lg bg-paper p-2.5 shadow-[var(--shadow-border)]"
            >
              <span className="tabular w-7 text-center text-xs font-semibold text-crest">{i + 1}</span>
              <Dual ar={step.textAr} en={step.textEn} className="flex-1 text-sm" />
              <div className="flex flex-col">
                <button type="button" className="size-8 text-muted hover:text-fg" onClick={() => move(i, -1)}>
                  <ChevronUp className="mx-auto size-4" />
                </button>
                <button type="button" className="size-8 text-muted hover:text-fg" onClick={() => move(i, 1)}>
                  <ChevronDown className="mx-auto size-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <Button onClick={check}>{tx(lang, "checkSequence")}</Button>
      {result === "ok" ? <p className="text-sm font-medium text-ok">{tx(lang, "sequenceOk")}</p> : null}
      {result === "bad" ? <p className="text-sm font-medium text-warn">{tx(lang, "sequenceBad")}</p> : null}
    </div>
  );
}

function SpotGame({ skill }: { skill: Skill }) {
  const lang = useApp((s) => s.lang);
  const stw = lang === "ar" ? skill.minigame.seeThinkWonderAr : skill.minigame.seeThinkWonderEn;
  const stwAr = skill.minigame.seeThinkWonderAr;
  const stwEn = skill.minigame.seeThinkWonderEn;
  const [marks, setMarks] = useState([false, false, false]);
  const keys = ["see", "think", "wonder"] as const;
  const labels = [tx(lang, "see"), tx(lang, "think"), tx(lang, "wonder")];

  function toggle(i: number) {
    const next = [...marks];
    next[i] = !next[i];
    setMarks(next);
    if (next.every(Boolean)) credit(skill.id, "play", lang);
  }

  return (
    <div className="space-y-3">
      <WithSpeak
        ar={joinSpeak([skill.minigame.sceneAr, stwAr?.see, stwAr?.think, stwAr?.wonder])}
        en={joinSpeak([skill.minigame.sceneEn, stwEn?.see, stwEn?.think, stwEn?.wonder])}
        aria={tx(lang, "listenSection")}
      >
        <Dual
          ar={skill.minigame.sceneAr || ""}
          en={skill.minigame.sceneEn || ""}
          as="p"
          className="rounded-lg bg-paper p-3 text-sm leading-relaxed"
        />
      </WithSpeak>
      <p className="text-xs font-medium tracking-wide text-muted uppercase">{tx(lang, "spotPrompt")}</p>
      <div className="grid gap-2">
        {keys.map((k, i) => (
          <button
            key={k}
            type="button"
            onClick={() => toggle(i)}
            className={`rounded-lg p-3 text-start shadow-[var(--shadow-border)] transition-colors ${marks[i] ? "bg-primary/10" : "bg-card"}`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-crest">{labels[i]}</span>
              {marks[i] ? <Check className="size-4 text-ok" /> : null}
            </div>
            <p className="text-sm">{stw?.[k]}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function DialogueGame({ skill }: { skill: Skill }) {
  const lang = useApp((s) => s.lang);
  const [choice, setChoice] = useState<"bad" | "good" | null>(null);
  const bad = lang === "ar" ? skill.minigame.badDialogueAr : skill.minigame.badDialogueEn;
  const good = lang === "ar" ? skill.minigame.goodDialogueAr : skill.minigame.goodDialogueEn;

  function pick(which: "bad" | "good") {
    setChoice(which);
    if (which === "good") credit(skill.id, "play", lang);
    else if (useApp.getState().sound) playError();
  }

  return (
    <div className="space-y-3">
      <WithSpeak
        ar={joinSpeak([skill.minigame.sceneAr, skill.minigame.badDialogueAr, skill.minigame.goodDialogueAr])}
        en={joinSpeak([skill.minigame.sceneEn, skill.minigame.badDialogueEn, skill.minigame.goodDialogueEn])}
        aria={tx(lang, "listenSection")}
      >
        <Dual ar={skill.minigame.sceneAr || ""} en={skill.minigame.sceneEn || ""} as="p" className="text-sm leading-relaxed text-muted" />
      </WithSpeak>
      <p className="text-sm font-medium">{tx(lang, "chooseRespectful")}</p>
      <div className="grid gap-2">
        <button type="button" onClick={() => pick("bad")} className={`rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${choice === "bad" ? "bg-danger/10" : "bg-card"}`}>
          {bad}
        </button>
        <button type="button" onClick={() => pick("good")} className={`rounded-lg p-3 text-start text-sm shadow-[var(--shadow-border)] ${choice === "good" ? "bg-ok/10" : "bg-card"}`}>
          {good}
        </button>
      </div>
      {choice === "good" ? <p className="text-sm font-medium text-ok">{tx(lang, "correct")}</p> : null}
      {choice === "bad" ? <p className="text-sm font-medium text-warn">{tx(lang, "rethink")}</p> : null}
    </div>
  );
}

function WhichValueGame({ skill }: { skill: Skill }) {
  const lang = useApp((s) => s.lang);
  const [pick, setPick] = useState<string | null>(null);
  const target = (skill.minigame.targetValue || "").toLowerCase();

  function choose(id: string) {
    setPick(id);
    if (id === target) credit(skill.id, "play", lang);
    else if (useApp.getState().sound) playError();
  }

  return (
    <div className="space-y-3">
      <WithSpeak
        ar={joinSpeak([skill.minigame.scenarioAr, skill.minigame.justificationRequiredAr])}
        en={joinSpeak([skill.minigame.scenarioEn, skill.minigame.justificationRequiredEn])}
        aria={tx(lang, "listenSection")}
      >
        <Dual ar={skill.minigame.scenarioAr || ""} en={skill.minigame.scenarioEn || ""} as="p" className="text-sm leading-relaxed" />
      </WithSpeak>
      <p className="text-sm font-medium">{tx(lang, "whichValue")}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {VALUES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => choose(v.id)}
            className={`rounded-lg p-3 text-start shadow-[var(--shadow-border)] ${pick === v.id ? (v.id === target ? "bg-ok/10" : "bg-danger/10") : "bg-card"}`}
          >
            <Dual ar={v.nameAr} en={v.nameEn} className="text-sm font-medium" />
          </button>
        ))}
      </div>
      {pick === target ? (
        <Dual ar={skill.minigame.justificationRequiredAr || ""} en={skill.minigame.justificationRequiredEn || ""} as="p" className="text-sm text-ok" />
      ) : null}
    </div>
  );
}

function PlayPane({ skill }: { skill: Skill }) {
  const type = skill.minigame.type;
  if (type === "spot_problem") return <SpotGame skill={skill} />;
  if (type === "fix_dialogue") return <DialogueGame skill={skill} />;
  if (type === "which_value") return <WhichValueGame skill={skill} />;
  return <SequenceGame skill={skill} />;
}

function PartnerTimer({ seconds }: { seconds: number }) {
  const lang = useApp((s) => s.lang);
  const [left, setLeft] = useState(seconds);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setLeft(seconds);
    setRun(false);
  }, [seconds]);

  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => {
      setLeft((p) => {
        if (p <= 1) {
          setRun(false);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [run]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="tabular font-display text-3xl">
        {mm}:{ss}
      </span>
      <Button variant="secondary" onClick={() => setRun(!run)}>
        {run ? tx(lang, "pauseTimer") : tx(lang, "startPartner")}
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          setRun(false);
          setLeft(seconds);
        }}
      >
        {tx(lang, "reset")}
      </Button>
    </div>
  );
}

export function SkillStudio() {
  const open = useApp((s) => s.studioOpen);
  const close = useApp((s) => s.closeStudio);
  const id = useApp((s) => s.selectedSkillId);
  const lang = useApp((s) => s.lang);
  const grade = useApp((s) => s.grade);
  const completed = useApp((s) => s.completed);
  const isJunior = grade <= 3;
  const [kind, setKind] = useState<ActionKind>("play");
  const [text, setText] = useState("");
  const [tier, setTier] = useState<"tier1" | "tier2" | "tier3">("tier3");
  const skill = SKILLS.find((s) => s.id === id);

  if (!skill) {
    return (
      <Dialog open={open} onOpenChange={(v) => !v && close()}>
        <DialogContent>
          <DialogTitle>{tx(lang, "openStudio")}</DialogTitle>
        </DialogContent>
      </Dialog>
    );
  }

  const objectiveAr = isJunior ? skill.juniorObjectiveAr : skill.learningObjectiveAr;
  const objectiveEn = isJunior ? skill.juniorObjectiveEn : skill.learningObjectiveEn;
  const criteriaAr = isJunior ? skill.juniorCriteriaAr : skill.successCriteriaAr;
  const criteriaEn = isJunior ? skill.juniorCriteriaEn : skill.successCriteriaEn;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent wide>
        <div className="pe-8">
          <Badge>
            {skill.jpisValueAr} · {skill.jpisValue}
          </Badge>
          <DialogTitle className="mt-2">
            <Dual ar={skill.titleAr} en={skill.titleEn} />
          </DialogTitle>
          <Dual ar={skill.taglineAr} en={skill.taglineEn} as="p" className="mt-1 text-sm text-muted" />
          <div className="mt-2 flex flex-wrap gap-2">
            {skill.pypProfile.map((p, i) => (
              <Badge key={p} className="bg-ink/5 text-fg">
                {lang === "ar" ? skill.pypProfileAr[i] : p}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 rounded-lg bg-paper p-3 sm:grid-cols-2">
          <div>
            <SpeakHeading
              title={tx(lang, "objective")}
              ar={joinSpeak([tx("ar", "objective"), skill.titleAr, objectiveAr])}
              en={joinSpeak([tx("en", "objective"), skill.titleEn, objectiveEn])}
            />
            <Dual ar={objectiveAr} en={objectiveEn} as="p" className="text-sm leading-relaxed" />
          </div>
          <div>
            <SpeakHeading
              title={tx(lang, "hadith")}
              ar={joinSpeak([tx("ar", "hadith"), skill.islamicValueAr])}
              en={joinSpeak([tx("en", "hadith"), skill.islamicValueEn])}
            />
            <Dual ar={skill.islamicValueAr} en={skill.islamicValueEn} as="p" className="text-sm leading-relaxed" />
          </div>
        </div>

        <ul className="mt-3 space-y-1">
          <SpeakHeading
            title={tx(lang, "criteria")}
            ar={joinSpeak([tx("ar", "criteria"), ...criteriaAr])}
            en={joinSpeak([tx("en", "criteria"), ...criteriaEn])}
          />
          {criteriaAr.map((c, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-ok" />
              <Dual ar={c} en={criteriaEn[i] || c} />
            </li>
          ))}
        </ul>

        {grade === 4 ? (
          <div className="mt-3 rounded-lg bg-crest/8 p-3 text-sm">
            <SpeakHeading
              title={tx(lang, "scaffold")}
              ar={joinSpeak([tx("ar", "scaffold"), skill.grade4ScaffoldAr])}
              en={joinSpeak([tx("en", "scaffold"), skill.grade4ScaffoldEn])}
            />
            <Dual ar={skill.grade4ScaffoldAr} en={skill.grade4ScaffoldEn} />
          </div>
        ) : null}

        <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
          {KINDS.map((k) => {
            const isDone = Object.keys(completed).some((key) => key.endsWith(`:${skill.id}:${k}`));
            return (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`h-10 shrink-0 rounded-md px-3 text-xs font-medium ${kind === k ? "bg-primary text-primary-fg" : "bg-crest/8 text-crest"}`}
              >
                {tx(lang, k)}
                {isDone ? " · ✓" : ""}
              </button>
            );
          })}
        </div>

        <div className="mt-4 min-h-40">
          {kind === "play" ? <PlayPane skill={skill} /> : null}
          {kind === "practise" ? (
            <div className="space-y-3">
              <WithSpeak
                ar={joinSpeak([skill.practise.titleAr, skill.practise.promptAr, ...skill.practise.stemsAr])}
                en={joinSpeak([skill.practise.titleEn, skill.practise.promptEn, ...skill.practise.stemsEn])}
                aria={tx(lang, "practise")}
              >
                <Dual ar={skill.practise.titleAr} en={skill.practise.titleEn} as="h3" className="font-display text-lg" />
              </WithSpeak>
              <Dual ar={skill.practise.promptAr} en={skill.practise.promptEn} as="p" className="text-sm leading-relaxed" />
              <p className="text-xs font-medium text-muted">{tx(lang, "stems")}</p>
              <ul className="space-y-2">
                {skill.practise.stemsAr.map((s, i) => (
                  <li key={i} className="rounded-lg bg-paper p-3 text-sm">
                    <Dual ar={s} en={skill.practise.stemsEn[i] || s} />
                  </li>
                ))}
              </ul>
              <Button onClick={() => credit(skill.id, "practise", lang)}>{tx(lang, "confirm")}</Button>
            </div>
          ) : null}
          {kind === "partner" ? (
            <div className="space-y-3">
              <WithSpeak
                ar={joinSpeak([skill.partner.titleAr, skill.partner.promptAr])}
                en={joinSpeak([skill.partner.titleEn, skill.partner.promptEn])}
                aria={tx(lang, "partner")}
              >
                <Dual ar={skill.partner.titleAr} en={skill.partner.titleEn} as="h3" className="font-display text-lg" />
              </WithSpeak>
              <Dual ar={skill.partner.promptAr} en={skill.partner.promptEn} as="p" className="text-sm leading-relaxed" />
              <PartnerTimer seconds={Math.round((grade <= 3 ? 90 : 60) * (grade === 4 ? 1.5 : 1))} />
              <Button onClick={() => credit(skill.id, "partner", lang)}>{tx(lang, "confirm")}</Button>
            </div>
          ) : null}
          {kind === "group" ? (
            <div className="space-y-3">
              <WithSpeak
                ar={joinSpeak([
                  skill.groupChallenge.titleAr,
                  skill.groupChallenge.scenarioAr || skill.groupChallenge.instructionAr,
                  ...(skill.groupChallenge.investigationStepsAr || []),
                ])}
                en={joinSpeak([
                  skill.groupChallenge.titleEn,
                  skill.groupChallenge.scenarioEn || skill.groupChallenge.instructionEn,
                  ...(skill.groupChallenge.investigationStepsEn || []),
                ])}
                aria={tx(lang, "group")}
              >
                <Dual ar={skill.groupChallenge.titleAr} en={skill.groupChallenge.titleEn} as="h3" className="font-display text-lg" />
              </WithSpeak>
              {skill.groupChallenge.scenarioAr ? (
                <Dual ar={skill.groupChallenge.scenarioAr} en={skill.groupChallenge.scenarioEn || ""} as="p" className="text-sm" />
              ) : (
                <Dual ar={skill.groupChallenge.instructionAr || ""} en={skill.groupChallenge.instructionEn || ""} as="p" className="text-sm" />
              )}
              <ol className="space-y-2">
                {(skill.groupChallenge.investigationStepsAr || []).map((step, i) => (
                  <li key={i} className="rounded-lg bg-paper p-3 text-sm">
                    <Dual ar={step} en={skill.groupChallenge.investigationStepsEn?.[i] || step} />
                  </li>
                ))}
              </ol>
              <Button onClick={() => credit(skill.id, "group", lang)}>{tx(lang, "confirm")}</Button>
            </div>
          ) : null}
          {kind === "mission" ? (
            <div className="space-y-3">
              <WithSpeak
                ar={joinSpeak([skill.realLifeMission.titleAr, skill.realLifeMission.taskAr])}
                en={joinSpeak([skill.realLifeMission.titleEn, skill.realLifeMission.taskEn])}
                aria={tx(lang, "mission")}
              >
                <Dual ar={skill.realLifeMission.titleAr} en={skill.realLifeMission.titleEn} as="h3" className="font-display text-lg" />
              </WithSpeak>
              <Dual ar={skill.realLifeMission.taskAr} en={skill.realLifeMission.taskEn} as="p" className="text-sm leading-relaxed" />
              {skill.realLifeMission.requiresTeacherSignoff ? (
                <p className="text-xs text-muted">{tx(lang, "missionSignoff")}</p>
              ) : null}
              <Button onClick={() => credit(skill.id, "mission", lang)}>{tx(lang, "confirm")}</Button>
            </div>
          ) : null}
          {kind === "reflect" ? (
            <div className="space-y-3">
              <WithSpeak ar={skill.reflection.questionAr} en={skill.reflection.questionEn} aria={tx(lang, "reflect")}>
                <Dual ar={skill.reflection.questionAr} en={skill.reflection.questionEn} as="p" className="text-sm leading-relaxed" />
              </WithSpeak>
              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={tx(lang, "writeReflection")} />
              <Button
                onClick={() => {
                  if (!text.trim()) {
                    toast.message(tx(lang, "writeReflection"));
                    return;
                  }
                  credit(skill.id, "reflect", lang);
                  setText("");
                }}
              >
                {tx(lang, "shareReflection")}
              </Button>
            </div>
          ) : null}
          {kind === "mastery" ? (
            <div className="space-y-3">
              <div className="flex justify-end">
                <ListenButton
                  variant="icon"
                  aria={tx(lang, "mastery")}
                  ar={joinSpeak([
                    tx("ar", "mastery"),
                    skill.mastery.tier1.ar,
                    skill.mastery.tier2.ar,
                    skill.mastery.tier3.ar,
                  ])}
                  en={joinSpeak([
                    tx("en", "mastery"),
                    skill.mastery.tier1.en,
                    skill.mastery.tier2.en,
                    skill.mastery.tier3.en,
                  ])}
                />
              </div>
              {(["tier1", "tier2", "tier3"] as const).map((t) => (
                <label
                  key={t}
                  className={`flex cursor-pointer gap-3 rounded-lg p-3 shadow-[var(--shadow-border)] ${tier === t ? "bg-primary/10" : "bg-card"}`}
                >
                  <input type="radio" name="tier" className="mt-1 accent-primary" checked={tier === t} onChange={() => setTier(t)} />
                  <Dual ar={skill.mastery[t].ar} en={skill.mastery[t].en} className="text-sm" />
                </label>
              ))}
              <Button onClick={() => credit(skill.id, "mastery", lang)}>
                <Sparkles /> {tx(lang, "certify")}
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
