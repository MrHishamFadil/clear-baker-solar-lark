import { cn } from "@/lib/utils";

export function Crest({ className = "size-11" }: { className?: string }) {
  return (
    <img
      src="/jps-crest.png"
      alt=""
      width={64}
      height={64}
      className={cn("object-contain", className)}
      aria-hidden="true"
    />
  );
}
