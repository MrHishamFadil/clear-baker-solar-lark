import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { tx } from "@/lib/i18n";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  wide,
  overlayClassName,
}: {
  className?: string;
  children: React.ReactNode;
  wide?: boolean;
  overlayClassName?: string;
}) {
  const lang = useApp((s) => s.lang);
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out", overlayClassName)} />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[min(92vh,900px)] w-[min(96vw,720px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-card p-5 shadow-[var(--shadow-border)] outline-none",
          wide && "w-[min(96vw,980px)]",
          className,
        )}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute top-3 end-3 inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-crest/8 hover:text-fg"
          aria-label={tx(lang, "close")}
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-xl font-semibold text-fg", className)}
      {...props}
    />
  );
}
