import { adapt } from "@/lib/adapt";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Dual({
  ar,
  en,
  className,
  as: Tag = "span",
  block,
}: {
  ar: string;
  en: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div" | "li";
  block?: boolean;
}) {
  const lang = useApp((s) => s.lang);
  const dual = useApp((s) => s.dualLang);
  const section = useApp((s) => s.section);
  const a = adapt(ar, section);
  const e = adapt(en, section);
  const primary = lang === "ar" ? a : e;
  const secondary = lang === "ar" ? e : a;
  if (!dual) {
    return <Tag className={className}>{primary}</Tag>;
  }
  return (
    <Tag className={cn(block ? "block" : "", className)}>
      <span className="block">{primary}</span>
      <span className="mt-1 block text-[0.82em] font-normal leading-snug text-muted">{secondary}</span>
    </Tag>
  );
}

export function useCopy() {
  const lang = useApp((s) => s.lang);
  const section = useApp((s) => s.section);
  const dual = useApp((s) => s.dualLang);
  return { lang, section, dual };
}
