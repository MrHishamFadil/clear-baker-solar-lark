import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-crest/8 px-2.5 py-1 text-[11px] font-medium tracking-wide text-crest",
        className,
      )}
    >
      {children}
    </span>
  );
}
