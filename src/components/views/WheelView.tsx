import { useEffect, useRef, useState } from "react";
import { Dual } from "@/components/Dual";
import { WithSpeak, joinSpeak } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { burstConfetti } from "@/lib/confetti";
import { WHEEL, WHEEL_COLORS } from "@/lib/content";
import { playBell, playSuccess, playTick, resumeAudio, setWheelWhooshSpeed, startWheelWhoosh, stopWheelWhoosh } from "@/lib/audio";
import { tx } from "@/lib/i18n";
import { resolveTtsGender, speak } from "@/lib/speech";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

export function WheelView() {
  const lang = useApp((s) => s.lang);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSeg = useRef(-1);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const n = WHEEL.length;
  const arc = (Math.PI * 2) / n;

  useEffect(() => () => stopWheelWhoosh(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    const r = size / 2 - 8;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(angle);
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, i * arc, (i + 1) * arc);
      ctx.closePath();
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.fill();
      ctx.save();
      ctx.rotate(i * arc + arc / 2);
      ctx.fillStyle = i % WHEEL_COLORS.length === 6 ? "#1A1814" : "#F4EFE4";
      ctx.font = "600 11px 'IBM Plex Sans Arabic', sans-serif";
      ctx.textAlign = "right";
      const label = lang === "ar" ? WHEEL[i].textAr : WHEEL[i].textEn;
      ctx.fillText(label.slice(0, 22), r - 12, 4);
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.fillStyle = "#F4EFE4";
    ctx.fill();
    ctx.restore();
  }, [angle, lang, n, arc]);

  function spin() {
    if (spinning) return;
    resumeAudio();
    startWheelWhoosh();
    setSpinning(true);
    setWinner(null);
    lastSeg.current = -1;
    const extra = Math.PI * 8 + Math.random() * Math.PI * 4;
    const start = angle;
    const startTime = performance.now();
    const dur = 4200;
    function frame(now: number) {
      const t = Math.min(1, (now - startTime) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      const next = start + extra * ease;
      setAngle(next);
      const speed = 1 - t;
      setWheelWhooshSpeed(speed);
      const normalized = ((next % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const pointer = (Math.PI * 1.5 - normalized + Math.PI * 2) % (Math.PI * 2);
      const seg = Math.floor(pointer / arc) % n;
      if (seg !== lastSeg.current) {
        lastSeg.current = seg;
        playTick(speed);
      }
      if (t < 1) requestAnimationFrame(frame);
      else {
        stopWheelWhoosh();
        const i = seg;
        setWinner(i);
        setSpinning(false);
        playBell();
        const state = useApp.getState();
        const gender = resolveTtsGender(state.section, state.ttsVoice);
        const item = WHEEL[i];
        const spoken =
          state.lang === "ar"
            ? joinSpeak([item.textAr, item.actionAr])
            : joinSpeak([item.textEn, item.actionEn]);
        void speak(spoken, state.lang, gender);
      }
    }
    requestAnimationFrame(frame);
  }

  const item = winner !== null ? WHEEL[winner] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      <div className="relative mx-auto">
        <div className="absolute start-1/2 top-0 z-10 -translate-x-1/2">
          <div className="h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-crest" />
        </div>
        <canvas ref={canvasRef} width={360} height={360} className="size-[min(86vw,360px)]" />
        <div className="mt-3 flex justify-center">
          <Button onClick={spin} disabled={spinning} size="lg">
            {spinning ? tx(lang, "spinning") : tx(lang, "spin")}
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium text-muted">{tx(lang, "challenge")}</p>
        {item ? (
          <>
            <WithSpeak
              className="mt-2"
              aria={tx(lang, "challenge")}
              ar={joinSpeak([item.textAr, item.actionAr])}
              en={joinSpeak([item.textEn, item.actionEn])}
            >
              <Dual ar={item.textAr} en={item.textEn} as="h3" className="font-display text-2xl font-semibold" />
            </WithSpeak>
            <Dual ar={item.actionAr} en={item.actionEn} as="p" className="mt-3 text-sm leading-relaxed" />
            <Button
              className="mt-4"
              onClick={() => {
                useApp.getState().addScore(5);
                playSuccess();
                burstConfetti();
                toast.success(tx(lang, "awarded") + " +5");
              }}
            >
              {tx(lang, "completeChallenge")}
            </Button>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">{tx(lang, "ready")}</p>
        )}
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {WHEEL.map((w, i) => (
            <li key={i} className={`rounded-md px-2 py-1.5 text-xs ${winner === i ? "bg-primary/10 text-crest" : "text-muted"}`}>
              {lang === "ar" ? w.textAr : w.textEn}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
