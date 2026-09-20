export function ProgressRing({
  value,
  max,
  size = 112,
  label,
  sub,
}: {
  value: number;
  max: number;
  size?: number;
  label: string;
  sub?: string;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const pct = max <= 0 ? 0 : Math.min(1, value / max);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#ddd6c8" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#14644a"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="tabular text-lg font-semibold text-fg">{value}</span>
        {sub ? <span className="text-[10px] text-muted">{sub}</span> : null}
        <span className="text-[10px] font-medium text-crest">{label}</span>
      </div>
    </div>
  );
}
