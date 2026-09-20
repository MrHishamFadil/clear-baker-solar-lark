import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md bg-card px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
