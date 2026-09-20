import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActionKind, Lang, Observation, RewardKind, Role, Section, Squad, Student, Tab, TtsVoice } from "./types";
import { ACTION_POINTS } from "./types";
import { isSkillMastered, newestMedal } from "./rewards";
import { todayISO, uid } from "./utils";
import boysAr from "@/data/boys-ar.json";
import boysEn from "@/data/boys-en.json";
import girlsAr from "@/data/girls-ar.json";
import girlsEn from "@/data/girls-en.json";
import classes from "@/data/classes.json";
import boysRosters from "@/data/boys-rosters.json";

type RosterSeed = { nameAr: string; nameEn: string; code?: string };
const BOYS_ROSTERS = boysRosters as Record<string, RosterSeed[]>;
const DUMMY_BOYS = new Set(boysAr as string[]);

function officialBoys(grade: number, classId: string): RosterSeed[] {
  if (classId && BOYS_ROSTERS[classId]) return BOYS_ROSTERS[classId];
  const list = (classes as Record<string, string[]>)[String(grade)] || [];
  return list.flatMap((id) => BOYS_ROSTERS[id] || []);
}

function seedId(classId: string, seed: RosterSeed) {
  const code = (seed.code || "").replace(/\s+/g, "");
  const base = /^JPS/i.test(code) ? code : seed.nameEn || seed.nameAr;
  return `${classId || "all"}:${base.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/gi, "-")}`;
}

export const EMPTY_ROSTER: Student[] = [];
export const EMPTY_OBS: Observation = { stars: 0, mastered: false, notes: "", criteria: [], tier: "" };
export type PendingCredit = { skillId: string; kind: RewardKind };
export type Celebration = {
  studentId: string;
  skillId: string;
  kind: RewardKind;
  medalAr: string;
  medalEn: string;
};

export function makeRosterKey(grade: number, section: Section, classId: string) {
  return `${grade}-${section}-${classId || "all"}`;
}

export const DEFAULT_SQUADS: Squad[] = [
  { id: "s1", nameAr: "حماة السكينة", nameEn: "Keepers of Sakinah", stars: 0 },
  { id: "s2", nameAr: "أهل الأمانة", nameEn: "People of Amanah", stars: 0 },
  { id: "s3", nameAr: "فرسان اليمين", nameEn: "Knights of the Right", stars: 0 },
  { id: "s4", nameAr: "نجوم الإحسان", nameEn: "Stars of Ihsan", stars: 0 },
];

interface AppState {
  lang: Lang;
  dualLang: boolean;
  section: Section;
  grade: number;
  classId: string;
  tab: Tab;
  role: Role;
  score: number;
  sound: boolean;
  focusMode: boolean;
  selectedSkillId: string | null;
  studioOpen: boolean;
  classPanelOpen: boolean;
  completed: Record<string, string>;
  observations: Record<string, Observation>;
  rosters: Record<string, Student[]>;
  squads: Squad[];
  pollVotes: number[];
  votedToday: string;
  checkoutToday: string;
  streakMarks: Record<string, boolean>;
  checklist: Record<string, boolean>;
  voiceLevel: number;
  ttsVoice: TtsVoice;
  pendingCredit: PendingCredit | null;
  celebration: Celebration | null;
  setLang: (lang: Lang) => void;
  toggleDual: () => void;
  setSection: (section: Section) => void;
  setGrade: (grade: number) => void;
  setClassId: (id: string) => void;
  setTab: (tab: Tab) => void;
  setRole: (role: Role) => void;
  setSound: (on: boolean) => void;
  toggleFocus: () => void;
  openStudio: (skillId: string) => void;
  closeStudio: () => void;
  setClassPanel: (open: boolean) => void;
  addScore: (n: number) => void;
  completeAction: (skillId: string, kind: ActionKind) => { ok: boolean; points: number };
  isActionDone: (skillId: string, kind: ActionKind) => boolean;
  rosterKey: () => string;
  getRoster: () => Student[];
  addStudent: (nameAr: string, nameEn?: string) => void;
  fillRoster: () => void;
  ensureOfficialRoster: () => void;
  clearRoster: () => void;
  obsKey: (studentId: string, skillId: string) => string;
  getObs: (studentId: string, skillId: string) => Observation;
  saveObs: (studentId: string, skillId: string, patch: Partial<Observation>) => void;
  awardStudentStar: (studentId: string, skillId: string) => void;
  askWhoAchieved: (skillId: string, kind: RewardKind) => void;
  creditStudent: (studentId: string, skillId: string, kind: RewardKind, opts?: { closeStudio?: boolean }) => void;
  showCertificate: (studentId: string, skillId?: string) => void;
  resetStudentSkill: (studentId: string, skillId: string) => void;
  clearPendingCredit: () => void;
  clearCelebration: () => void;
  changeSquad: (id: string, delta: number) => void;
  resetSquads: () => void;
  castVote: (idx: number) => void;
  resetPoll: () => void;
  markCheckout: () => void;
  toggleStreak: (id: string) => void;
  toggleCheck: (id: string) => void;
  setVoice: (level: number) => void;
  setTtsVoice: (ttsVoice: TtsVoice) => void;
  studentTotals: () => Array<{ student: Student; stars: number; mastered: number }>;
}

function emptyObs(): Observation {
  return { stars: 0, mastered: false, notes: "", criteria: [], tier: "" };
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      lang: "ar",
      dualLang: false,
      section: "boys",
      grade: 5,
      classId: "5A",
      tab: "today",
      role: "teacher",
      score: 0,
      sound: true,
      focusMode: false,
      selectedSkillId: null,
      studioOpen: false,
      classPanelOpen: false,
      completed: {},
      observations: {},
      rosters: {},
      squads: DEFAULT_SQUADS,
      pollVotes: [0, 0, 0, 0],
      votedToday: "",
      checkoutToday: "",
      streakMarks: {},
      checklist: {},
      voiceLevel: 1,
      ttsVoice: "auto",
      pendingCredit: null,
      celebration: null,
      setLang: (lang) => set({ lang }),
      toggleDual: () => set({ dualLang: !get().dualLang }),
      setSection: (section) => {
        set({ section });
        get().ensureOfficialRoster();
      },
      setGrade: (grade) => {
        const list = (classes as Record<string, string[]>)[String(grade)] || [];
        set({ grade, classId: list[0] || "" });
        get().ensureOfficialRoster();
      },
      setClassId: (classId) => {
        set({ classId });
        get().ensureOfficialRoster();
      },
      setTab: (tab) => set({ tab }),
      setRole: (role) => set({ role }),
      setSound: (sound) => set({ sound }),
      toggleFocus: () => set({ focusMode: !get().focusMode }),
      openStudio: (skillId) => set({ selectedSkillId: skillId, studioOpen: true, tab: "skills" }),
      closeStudio: () => set({ studioOpen: false }),
      setClassPanel: (classPanelOpen) => set({ classPanelOpen }),
      addScore: (n) => set({ score: get().score + n }),
      isActionDone: (skillId, kind) => {
        const key = `${todayISO()}:${skillId}:${kind}`;
        return Boolean(get().completed[key]);
      },
      completeAction: (skillId, kind) => {
        const key = `${todayISO()}:${skillId}:${kind}`;
        if (get().completed[key]) return { ok: false, points: 0 };
        const points = ACTION_POINTS[kind];
        set({
          completed: { ...get().completed, [key]: todayISO() },
          score: get().score + points,
        });
        return { ok: true, points };
      },
      rosterKey: () => {
        const { grade, section, classId } = get();
        return `${grade}-${section}-${classId || "all"}`;
      },
      getRoster: () => get().rosters[get().rosterKey()] ?? [],
      addStudent: (nameAr, nameEn) => {
        const key = get().rosterKey();
        const list = get().rosters[key] ?? [];
        const student: Student = {
          id: uid(),
          nameAr: nameAr.trim(),
          nameEn: (nameEn || nameAr).trim(),
        };
        set({ rosters: { ...get().rosters, [key]: [...list, student] } });
      },
      fillRoster: () => {
        const { section, grade, classId } = get();
        const key = get().rosterKey();
        if (section === "boys") {
          const seeds = officialBoys(grade, classId);
          if (seeds.length) {
            set({
              rosters: {
                ...get().rosters,
                [key]: seeds.map((seed) => ({
                  id: seedId(classId, seed),
                  nameAr: seed.nameAr,
                  nameEn: seed.nameEn,
                })),
              },
            });
            return;
          }
        }
        const ar = (section === "girls" ? girlsAr : boysAr) as string[];
        const en = (section === "girls" ? girlsEn : boysEn) as string[];
        const existing = new Set((get().rosters[key] ?? []).map((s) => s.nameAr));
        const picked: Student[] = [];
        for (let i = 0; i < ar.length && picked.length < 12; i++) {
          if (existing.has(ar[i])) continue;
          picked.push({ id: uid(), nameAr: ar[i], nameEn: en[i] || ar[i] });
        }
        set({
          rosters: { ...get().rosters, [key]: [...(get().rosters[key] ?? []), ...picked] },
        });
      },
      ensureOfficialRoster: () => {
        if (get().section !== "boys") return;
        const seeds = officialBoys(get().grade, get().classId);
        if (!seeds.length) return;
        const current = get().getRoster();
        const looksPlaceholder =
          current.length === 0 || current.every((s) => DUMMY_BOYS.has(s.nameAr) && !s.nameAr.includes(" "));
        if (looksPlaceholder) get().fillRoster();
      },
      clearRoster: () => {
        const key = get().rosterKey();
        set({ rosters: { ...get().rosters, [key]: [] } });
      },
      obsKey: (studentId, skillId) => `${get().rosterKey()}:${studentId}:${skillId}`,
      getObs: (studentId, skillId) =>
        get().observations[get().obsKey(studentId, skillId)] ?? emptyObs(),
      saveObs: (studentId, skillId, patch) => {
        const key = get().obsKey(studentId, skillId);
        const prev = get().observations[key] ?? emptyObs();
        set({ observations: { ...get().observations, [key]: { ...prev, ...patch } } });
      },
      awardStudentStar: (studentId, skillId) => {
        get().creditStudent(studentId, skillId, "star");
      },
      askWhoAchieved: (skillId, kind) => set({ pendingCredit: { skillId, kind } }),
      clearPendingCredit: () => set({ pendingCredit: null }),
      clearCelebration: () => set({ celebration: null }),
      creditStudent: (studentId, skillId, kind, opts) => {
        const key = get().obsKey(studentId, skillId);
        const prev = get().observations[key] ?? emptyObs();
        const roster = get().getRoster();
        if (!roster.some((s) => s.id === studentId)) return;
        const prefix = get().rosterKey() + ":";
        let prevStars = 0;
        let prevMastered = 0;
        for (const [obsKey, obs] of Object.entries(get().observations)) {
          if (!obsKey.startsWith(prefix + studentId)) continue;
          prevStars += obs.stars;
          if (isSkillMastered(obs)) prevMastered += 1;
        }
        const starGain = kind === "mastery" ? 5 : 1;
        const nextObs = {
          ...prev,
          stars: prev.stars + starGain,
          mastered: kind === "mastery" ? true : prev.mastered,
          tier: kind === "mastery" ? ("tier3" as const) : prev.tier,
        };
        const masteredNow = isSkillMastered(nextObs);
        const masteredDelta = masteredNow && !isSkillMastered(prev) ? 1 : 0;
        const medal = newestMedal(prevStars, prevMastered, prevStars + starGain, prevMastered + masteredDelta);
        set({
          observations: { ...get().observations, [key]: nextObs },
          score: get().score + starGain * 5,
          pendingCredit: null,
          studioOpen: opts?.closeStudio ? false : get().studioOpen,
          celebration: {
            studentId,
            skillId,
            kind,
            medalAr: medal.titleAr,
            medalEn: medal.titleEn,
          },
        });
      },
      showCertificate: (studentId, skillId) => {
        const roster = get().getRoster();
        if (!roster.some((s) => s.id === studentId)) return;
        const prefix = get().rosterKey() + ":";
        let stars = 0;
        let mastered = 0;
        for (const [obsKey, obs] of Object.entries(get().observations)) {
          if (!obsKey.startsWith(prefix + studentId)) continue;
          stars += obs.stars;
          if (isSkillMastered(obs)) mastered += 1;
        }
        const medal = newestMedal(0, 0, stars, mastered);
        set({
          celebration: {
            studentId,
            skillId: skillId || "",
            kind: mastered > 0 ? "mastery" : "star",
            medalAr: medal.titleAr,
            medalEn: medal.titleEn,
          },
        });
      },
      resetStudentSkill: (studentId, skillId) => {
        const key = get().obsKey(studentId, skillId);
        const prev = get().observations[key] ?? emptyObs();
        set({
          observations: {
            ...get().observations,
            [key]: { ...prev, stars: 0, mastered: false, tier: prev.tier === "tier3" ? "tier2" : prev.tier },
          },
        });
      },
      changeSquad: (id, delta) => {
        set({
          squads: get().squads.map((s) =>
            s.id === id ? { ...s, stars: Math.max(0, s.stars + delta) } : s,
          ),
        });
      },
      resetSquads: () => set({ squads: DEFAULT_SQUADS.map((s) => ({ ...s, stars: 0 })) }),
      castVote: (idx) => {
        const votes = [...get().pollVotes];
        votes[idx] = (votes[idx] || 0) + 1;
        const first = get().votedToday !== todayISO();
        set({
          pollVotes: votes,
          votedToday: todayISO(),
          score: first ? get().score + 5 : get().score,
        });
      },
      resetPoll: () => set({ pollVotes: [0, 0, 0, 0], votedToday: "" }),
      markCheckout: () => {
        if (get().checkoutToday === todayISO()) return;
        set({ checkoutToday: todayISO(), score: get().score + 10 });
      },
      toggleStreak: (id) => {
        const key = `${todayISO()}:${id}`;
        set({ streakMarks: { ...get().streakMarks, [key]: !get().streakMarks[key] } });
      },
      toggleCheck: (id) => {
        const key = `${todayISO()}:${id}`;
        set({ checklist: { ...get().checklist, [key]: !get().checklist[key] } });
      },
      setVoice: (voiceLevel) => set({ voiceLevel }),
      setTtsVoice: (ttsVoice) => set({ ttsVoice }),
      studentTotals: () => {
        const roster = get().getRoster();
        const observations = get().observations;
        const prefix = get().rosterKey() + ":";
        return roster
          .map((student) => {
            let stars = 0;
            let mastered = 0;
            for (const [key, obs] of Object.entries(observations)) {
              if (!key.startsWith(prefix + student.id)) continue;
              stars += obs.stars;
              if (isSkillMastered(obs)) mastered += 1;
            }
            return { student, stars, mastered };
          })
          .sort((a, b) => b.stars - a.stars || b.mastered - a.mastered);
      },
    }),
    {
      name: "fursan-qiyam-v1",
      skipHydration: true,
      partialize: (s) => ({
        lang: s.lang,
        dualLang: s.dualLang,
        section: s.section,
        grade: s.grade,
        classId: s.classId,
        tab: s.tab,
        role: s.role,
        score: s.score,
        sound: s.sound,
        completed: s.completed,
        observations: s.observations,
        rosters: s.rosters,
        squads: s.squads,
        pollVotes: s.pollVotes,
        votedToday: s.votedToday,
        checkoutToday: s.checkoutToday,
        streakMarks: s.streakMarks,
        checklist: s.checklist,
        voiceLevel: s.voiceLevel,
        ttsVoice: s.ttsVoice,
      }),
    },
  ),
);
