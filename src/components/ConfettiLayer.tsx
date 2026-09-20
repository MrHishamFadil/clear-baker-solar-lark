import { useEffect, useRef, useState } from "react";

export function ConfettiLayer() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const onBurst = () => setLive(true);
    window.addEventListener("fursan:confetti", onBurst);
    return () => window.removeEventListener("fursan:confetti", onBurst);
  }, []);

  useEffect(() => {
    if (!live) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const surface = canvas;
    const draw = ctx;
    let raf = 0;
    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      rot: number;
      vr: number;
      color: string;
      life: number;
    };
    let particles: P[] = [];
    const colors = ["#0F3D32", "#14644A", "#3D7A66", "#F4EFE4", "#1A1814", "#C9B89A"];

    function resize() {
      surface.width = window.innerWidth;
      surface.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn() {
      const cx = surface.width / 2;
      const cy = surface.height * 0.28;
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 4 + Math.random() * 9;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 4,
          w: 4 + Math.random() * 6,
          h: 6 + Math.random() * 8,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          color: colors[i % colors.length],
          life: 1,
        });
      }
    }

    function tick() {
      draw.clearRect(0, 0, surface.width, surface.height);
      particles.forEach((p) => {
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.012;
        draw.save();
        draw.translate(p.x, p.y);
        draw.rotate(p.rot);
        draw.globalAlpha = Math.max(0, p.life);
        draw.fillStyle = p.color;
        draw.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        draw.restore();
      });
      particles = particles.filter((p) => p.life > 0 && p.y < surface.height + 20);
      if (particles.length) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        setLive(false);
      }
    }

    spawn();
    tick();
    const onBurst = () => {
      spawn();
      if (!raf) tick();
    };
    window.addEventListener("fursan:confetti", onBurst);
    return () => {
      window.removeEventListener("fursan:confetti", onBurst);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [live]);

  if (!live) return null;
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true" />;
}
