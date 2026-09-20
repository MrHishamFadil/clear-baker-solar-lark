import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-24 w-full rounded-lg bg-card p-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted focus-visible:outline-none",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
