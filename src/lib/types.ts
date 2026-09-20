export type Lang = "ar" | "en";
export type Section = "boys" | "girls";
export type Role = "teacher" | "student";
export type TtsVoice = "auto" | "male" | "female";
export type RewardKind = "star" | "mastery";
export type Tab =
  | "today"
  | "skills"
  | "values"
  | "spiral"
  | "ihsan"
  | "scenarios"
  | "wheel"
  | "toolkit"
  | "agency"
  | "charter";

export type ActionKind =
  | "play"
  | "practise"
  | "partner"
  | "group"
  | "mission"
  | "reflect"
  | "mastery";

export interface Student {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface Observation {
  stars: number;
  mastered: boolean;
  notes: string;
  criteria: boolean[];
  tier: "tier1" | "tier2" | "tier3" | "";
}

export interface Squad {
  id: string;
  nameAr: string;
  nameEn: string;
  stars: number;
}

export const ACTION_POINTS: Record<ActionKind, number> = {
  play: 10,
  practise: 10,
  partner: 10,
  group: 10,
  mission: 15,
  reflect: 10,
  mastery: 20,
};

export const TABS: Tab[] = [
  "today",
  "skills",
  "values",
  "spiral",
  "ihsan",
  "scenarios",
  "wheel",
  "toolkit",
  "agency",
  "charter",
];
