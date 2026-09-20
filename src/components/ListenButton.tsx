import type { ReactNode } from "react";
import { Loader2, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinSpeak, resolveTtsGender, speak, stopSpeak, useSpeakStatus, voiceCaption } from "@/lib/speech";
import { useApp } from "@/lib/store";
import { tx } from "@/lib/i18n";
import { adapt } from "@/lib/adapt";
import { cn } from "@/lib/utils";

type Tone = "default" | "onDark";

export function ListenButton({
  ar,
  en,
  variant = "label",
  tone = "default",
  aria,
}: {
  ar: string;
  en: string;
  variant?: "label" | "icon";
  tone?: Tone;
  aria?: string;
}) {
  const lang = useApp((s) => s.lang);
  const section = useApp((s) => s.section);
  const ttsVoice = useApp((s) => s.ttsVoice);
  const gender = resolveTtsGender(section, ttsVoice);
  const text = adapt(lang === "ar" ? ar : en, section);
  const key = `${gender}:${lang}:${text.trim()}`;
  const status = useSpeakStatus();
  const active = status.key === key;
  const loading = active && status.phase === "loading";
  const playing = active && status.phase === "playing";
  const caption = voiceCaption(lang, gender);
  const label = playing || loading ? tx(lang, "stopListen") : aria || tx(lang, "listen");

  return (
    <span className={cn("inline-flex items-center", variant === "label" ? "gap-2" : "")}>
      <Button
        type="button"
        variant={playing || loading ? "secondary" : "ghost"}
        size={variant === "icon" ? "icon" : "sm"}
        className={cn(
          variant === "icon" && "size-11 shrink-0",
          tone === "onDark" && !playing && !loading && "text-primary-fg hover:bg-primary-fg/12",
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (playing || loading) stopSpeak();
          else void speak(text, lang, gender);
        }}
        aria-label={label}
        title={label}
      >
        {loading ? <Loader2 className="animate-spin" /> : playing ? <Square /> : <Volume2 />}
        {variant === "label"
          ? loading
            ? tx(lang, "preparingVoice")
            : playing
              ? tx(lang, "stopListen")
              : tx(lang, "listen")
          : null}
      </Button>
      {variant === "label" ? (
        <span className="hidden text-[11px] text-muted sm:inline">
          {caption.name} · {caption.locale}
        </span>
      ) : null}
    </span>
  );
}

export function SpeakHeading({
  title,
  ar,
  en,
  tone = "default",
}: {
  title: string;
  ar: string;
  en: string;
  tone?: Tone;
}) {
  return (
    <div className="mb-1 flex items-center gap-1">
      <p className={cn("text-xs font-medium", tone === "onDark" ? "text-primary-fg/80" : "text-muted")}>{title}</p>
      <ListenButton variant="icon" ar={ar} en={en} tone={tone} aria={title} />
    </div>
  );
}

export function WithSpeak({
  ar,
  en,
  children,
  tone = "default",
  aria,
  className,
}: {
  ar: string;
  en: string;
  children: ReactNode;
  tone?: Tone;
  aria?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <div className="min-w-0 flex-1">{children}</div>
      <ListenButton variant="icon" ar={ar} en={en} tone={tone} aria={aria} />
    </div>
  );
}

export { joinSpeak };
