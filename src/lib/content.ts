import skills from "@/data/skills.json";
import scenarios from "@/data/scenarios.json";
import values from "@/data/values.json";
import spiral from "@/data/spiral.json";
import warmups from "@/data/warmups.json";
import ihsan from "@/data/ihsan.json";
import checklist from "@/data/checklist.json";
import grades from "@/data/grades.json";
import classes from "@/data/classes.json";
import wheel from "@/data/wheel.json";

export type Minigame = {
  type: string;
  titleAr: string;
  titleEn: string;
  instructionAr?: string;
  instructionEn?: string;
  steps?: Array<{ id: number; textAr: string; textEn: string }>;
  sceneAr?: string;
  sceneEn?: string;
  seeThinkWonderAr?: { see: string; think: string; wonder: string };
  seeThinkWonderEn?: { see: string; think: string; wonder: string };
  badDialogueAr?: string;
  badDialogueEn?: string;
  goodDialogueAr?: string;
  goodDialogueEn?: string;
  targetValue?: string;
  targetValueAr?: string;
  justificationRequiredAr?: string;
  justificationRequiredEn?: string;
  scenarioAr?: string;
  scenarioEn?: string;
};

export type Skill = {
  id: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  badgeColor: string;
  icon: string;
  jpisValue: string;
  jpisValueAr: string;
  pypProfile: string[];
  pypProfileAr: string[];
  islamicValueAr: string;
  islamicValueEn: string;
  learningObjectiveAr: string;
  learningObjectiveEn: string;
  juniorObjectiveAr: string;
  juniorObjectiveEn: string;
  successCriteriaAr: string[];
  successCriteriaEn: string[];
  juniorCriteriaAr: string[];
  juniorCriteriaEn: string[];
  grade4ScaffoldAr: string;
  grade4ScaffoldEn: string;
  grade4TimerSecs: number;
  character: { nameAr: string; nameEn: string };
  minigame: Minigame;
  practise: {
    titleAr: string;
    titleEn: string;
    promptAr: string;
    promptEn: string;
    stemsAr: string[];
    stemsEn: string[];
  };
  partner: { titleAr: string; titleEn: string; promptAr: string; promptEn: string };
  groupChallenge: {
    titleAr: string;
    titleEn: string;
    scenarioAr?: string;
    scenarioEn?: string;
    investigationStepsAr?: string[];
    investigationStepsEn?: string[];
    instructionAr?: string;
    instructionEn?: string;
  };
  realLifeMission: {
    titleAr: string;
    titleEn: string;
    taskAr: string;
    taskEn: string;
    requiresTeacherSignoff?: boolean;
  };
  reflection: { questionAr: string; questionEn: string };
  mastery: {
    tier1: { ar: string; en: string };
    tier2: { ar: string; en: string };
    tier3: { ar: string; en: string };
  };
};

export type Scenario = {
  id: number;
  character: string;
  characterEn: string;
  titleAr: string;
  titleEn: string;
  contextAr: string;
  contextEn: string;
  optionsAr: Array<{ text: string; correct: boolean; feedback: string }>;
  optionsEn: Array<{ text: string; correct: boolean; feedback: string }>;
  hadithAnchorAr: string;
  hadithAnchorEn: string;
  pypProfileAr: string;
  pypProfileEn: string;
};

export type ValueItem = {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  definitionAr: string;
  definitionEn: string;
  quranHadithAr: string;
  quranHadithEn: string;
  pypLinkAr: string;
  pypLinkEn: string;
  scenarioGame: {
    titleAr: string;
    titleEn: string;
    contextAr: string;
    contextEn: string;
    optionsAr: Array<{ text: string; correct: boolean; feedback: string }>;
    optionsEn: Array<{ text: string; correct: boolean; feedback: string }>;
  };
  pairTask: { titleAr: string; titleEn: string; instructionAr: string; instructionEn: string };
  groupChallenge: { titleAr: string; titleEn: string; instructionAr: string; instructionEn: string };
  realLifeMission: { titleAr: string; titleEn: string; taskAr: string; taskEn: string };
  reflectionQuestionsAr: string[];
  reflectionQuestionsEn: string[];
};

export type GradeConfig = {
  grade: number;
  stage: string;
  stageAr: string;
  stageEn: string;
  nameAr: string;
  nameEn: string;
  cognitiveLevelAr: string;
  cognitiveLevelEn: string;
  timerScale: number;
  timerPartner: number;
  pedagogicalFocusAr: string;
  pedagogicalFocusEn: string;
  customActivityAr: string;
  customActivityEn: string;
  badgeAr: string;
  badgeEn: string;
  ageRange: string;
};

export const SKILLS = skills as Skill[];
export const SCENARIOS = scenarios as Scenario[];
export const VALUES = values as ValueItem[];
export const SPIRAL = spiral as Array<{
  day: number;
  week: number;
  titleAr: string;
  titleEn: string;
  focusAr: string;
  focusEn: string;
  quickWarmup?: { titleAr: string; titleEn: string; promptAr?: string; promptEn?: string };
  newSkillsAr?: string[];
  newSkillsEn?: string[];
  spiralReviewAr?: string[];
  spiralReviewEn?: string[];
  physicalRehearsalAr?: string;
  physicalRehearsalEn?: string;
  activityAr?: string;
  activityEn?: string;
  drillAr?: string;
  drillEn?: string;
  juniorNoteAr?: string;
  juniorNoteEn?: string;
}>;
export const WARMUPS = warmups as Array<{
  id: string;
  titleAr: string;
  titleEn: string;
  duration: string;
  descAr: string;
  descEn: string;
}>;
export const IHSAN = ihsan as {
  stages: Array<{
    stage: number;
    nameAr: string;
    nameEn: string;
    target: number;
    minScore: number;
    maxScore: number;
    descAr: string;
    descEn: string;
  }>;
  streaks: {
    titleAr: string;
    titleEn: string;
    items: Array<{ id: string; titleAr: string; titleEn: string; targetDays: number }>;
  };
  badges: Array<{ id: string; titleAr: string; titleEn: string; descAr: string; descEn: string }>;
};
export const CHECKLIST = checklist as Array<{ id: string; textAr: string; textEn: string }>;
export const GRADES = grades as Record<string, GradeConfig>;
export const CLASSES = classes as Record<string, string[]>;
export const WHEEL = wheel as Array<{
  textAr: string;
  textEn: string;
  actionAr: string;
  actionEn: string;
}>;
export const WHEEL_COLORS = [
  "#0F3D32",
  "#14644A",
  "#1F6B56",
  "#3D7A66",
  "#5A8F7A",
  "#8A9E8F",
  "#C4B8A0",
  "#1A1814",
];

export function gradeConfig(grade: number): GradeConfig {
  return GRADES[String(grade)] ?? GRADES["5"];
}

export function featuredSkillIndex() {
  const day = new Date().getDate();
  return day % SKILLS.length;
}

export function currentStage(score: number) {
  const stages = IHSAN.stages;
  let current = stages[0];
  for (const s of stages) {
    if (score >= s.minScore) current = s;
  }
  const next = stages.find((s) => s.minScore > score) ?? stages[stages.length - 1];
  return { current, next };
}
