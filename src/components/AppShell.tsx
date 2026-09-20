import { useEffect } from "react";
import {
  BookOpen,
  Compass,
  Flag,
  LayoutGrid,
  Megaphone,
  Menu,
  Sparkles,
  Star,
  Swords,
  Timer,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Crest } from "@/components/Crest";
import { ConfettiLayer } from "@/components/ConfettiLayer";
import { Button } from "@/components/ui/button";
import { SkillStudio } from "@/components/views/SkillStudio";
import { TodayView } from "@/components/views/TodayView";
import { SkillsView } from "@/components/views/SkillsView";
import { ValuesView } from "@/components/views/ValuesView";
import { SpiralView } from "@/components/views/SpiralView";
import { IhsanView } from "@/components/views/IhsanView";
import { ScenariosView } from "@/components/views/ScenariosView";
import { WheelView } from "@/components/views/WheelView";
import { ToolkitView } from "@/components/views/ToolkitView";
import { AgencyView } from "@/components/views/AgencyView";
import { CharterView } from "@/components/views/CharterView";
import { ClassPanel } from "@/components/views/ClassPanel";
import { WhoAchieved } from "@/components/WhoAchieved";
import { RewardMoment } from "@/components/RewardMoment";
import { CLASSES, gradeConfig } from "@/lib/content";
import { TAB_LABEL, tx } from "@/lib/i18n";
import { resumeAudio } from "@/lib/audio";
import { useApp } from "@/lib/store";
import { TABS, type Tab } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<Tab, typeof Star> = {
  today: Sparkles,
  skills: BookOpen,
  values: Flag,
  spiral: Compass,
  ihsan: Star,
  scenarios: Swords,
  wheel: LayoutGrid,
  toolkit: Timer,
  agency: Megaphone,
  charter: Users,
};

export function AppShell() {
  const lang = useApp((s) => s.lang);
  const dual = useApp((s) => s.dualLang);
  const section = useApp((s) => s.section);
  const grade = useApp((s) => s.grade);
  const classId = useApp((s) => s.classId);
  const tab = useApp((s) => s.tab);
  const role = useApp((s) => s.role);
  const score = useApp((s) => s.score);
  const sound = useApp((s) => s.sound);
  const focus = useApp((s) => s.focusMode);
  const cfg = gradeConfig(grade);
  const classes = CLASSES[String(grade)] || [];

  useEffect(() => {
    const result = useApp.persist.rehydrate();
    void Promise.resolve(result).then(() => useApp.getState().ensureOfficialRoster());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const onFirst = () => resumeAudio();
    window.addEventListener("pointerdown", onFirst, { once: true });
    return () => window.removeEventListener("pointerdown", onFirst);
  }, []);

  return (
    <div className={cn("min-h-screen", focus && "[&_.extra]:hidden")}>
      <ConfettiLayer />
      <header className="no-print sticky top-0 z-30 border-b border-border bg-card/92 backdrop-blur-md">
        <div className="h-0.5 bg-primary" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-start outline-none ring-offset-2 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => {
              const s = useApp.getState();
              s.closeStudio();
              s.setClassPanel(false);
              s.setTab("today");
            }}
            aria-label={tx(lang, "todayKicker")}
          >
            <Crest className="size-11 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold leading-none">{tx(lang, "brand")}</p>
              <p className="mt-1 hidden truncate text-[11px] text-muted sm:block">{tx(lang, "brandSub")}</p>
            </div>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <span className="tabular inline-flex h-10 items-center rounded-md bg-crest/8 px-3 text-sm font-semibold text-crest">
              <Star className="me-1.5 size-4" />
              {score}
            </span>
            <select
              className="h-10 max-w-[10rem] rounded-md bg-paper px-2 text-xs"
              value={grade}
              onChange={(e) => useApp.getState().setGrade(Number(e.target.value))}
              aria-label={tx(lang, "grade")}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                <option key={g} value={g}>
                  {lang === "ar" ? gradeConfig(g).nameAr : gradeConfig(g).nameEn}
                </option>
              ))}
            </select>
            {classes.length ? (
              <select
                className="hidden h-10 rounded-md bg-paper px-2 text-xs sm:block"
                value={classId}
                onChange={(e) => useApp.getState().setClassId(e.target.value)}
              >
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : null}
            <div className="hidden rounded-md bg-paper p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => useApp.getState().setSection("boys")}
                className={cn(
                  "h-9 rounded-[6px] px-3 text-xs font-medium",
                  section === "boys" && "bg-card shadow-[var(--shadow-border)]",
                )}
              >
                {tx(lang, "boys")}
              </button>
              <button
                type="button"
                onClick={() => useApp.getState().setSection("girls")}
                className={cn(
                  "h-9 rounded-[6px] px-3 text-xs font-medium",
                  section === "girls" && "bg-card shadow-[var(--shadow-border)]",
                )}
              >
                {tx(lang, "girls")}
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={() => useApp.getState().setLang(lang === "ar" ? "en" : "ar")}>
              {lang === "ar" ? "EN" : "عربي"}
            </Button>
            <Button
              variant={dual ? "secondary" : "ghost"}
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => useApp.getState().toggleDual()}
            >
              AR/EN
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => useApp.getState().setSound(!sound)}
              aria-label={tx(lang, "soundOn")}
            >
              {sound ? <Volume2 /> : <VolumeX />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => useApp.getState().setClassPanel(true)}
            >
              {tx(lang, "honorRoll")}
            </Button>
          </div>
        </div>
        <nav className="extra mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-3 pb-2 md:flex">
          {TABS.map((id) => {
            const Icon = ICONS[id];
            const label = TAB_LABEL[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => useApp.getState().setTab(id)}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-xs font-medium",
                  tab === id ? "bg-primary text-primary-fg" : "text-muted hover:bg-crest/8 hover:text-fg",
                )}
              >
                <Icon className="size-4" />
                {lang === "ar" ? label.shortAr : label.shortEn}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">
        {!focus ? (
          <p className="extra mb-4 hidden text-xs text-muted md:block">
            {lang === "ar" ? cfg.pedagogicalFocusAr : cfg.pedagogicalFocusEn}
            {role === "student" ? ` · ${tx(lang, "student")}` : ` · ${tx(lang, "teacher")}`}
          </p>
        ) : null}
        {tab === "today" ? <TodayView /> : null}
        {tab === "skills" ? <SkillsView /> : null}
        {tab === "values" ? <ValuesView /> : null}
        {tab === "spiral" ? <SpiralView /> : null}
        {tab === "ihsan" ? <IhsanView /> : null}
        {tab === "scenarios" ? <ScenariosView /> : null}
        {tab === "wheel" ? <WheelView /> : null}
        {tab === "toolkit" ? <ToolkitView /> : null}
        {tab === "agency" ? <AgencyView /> : null}
        {tab === "charter" ? <CharterView /> : null}
      </main>

      <nav className="no-print extra fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="flex justify-around">
          {(["today", "skills", "scenarios", "ihsan", "toolkit"] as Tab[]).map((id) => {
            const Icon = ICONS[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => useApp.getState().setTab(id)}
                className={cn(
                  "flex min-w-12 flex-col items-center gap-0.5 text-[10px]",
                  tab === id ? "text-primary" : "text-muted",
                )}
              >
                <Icon className="size-5" />
                {lang === "ar" ? TAB_LABEL[id].shortAr : TAB_LABEL[id].shortEn}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => useApp.getState().setClassPanel(true)}
            className="flex min-w-12 flex-col items-center gap-0.5 text-[10px] text-muted"
          >
            <Menu className="size-5" />
            {tx(lang, "more")}
          </button>
        </div>
      </nav>

      <SkillStudio />
      <ClassPanel />
      <WhoAchieved />
      <RewardMoment />
    </div>
  );
}
