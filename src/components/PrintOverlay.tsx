import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export function PrintOverlay({
  open,
  onClose,
  onPrint,
  onSave,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onPrint: () => void;
  onSave: () => void;
  children: React.ReactNode;
}) {
  const lang = useApp((s) => s.lang);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="print-overlay fixed inset-0 z-[300] overflow-auto bg-[#F7F1E4] p-4 sm:p-8">
      <div className="no-print mx-auto mb-4 flex max-w-3xl flex-wrap items-center gap-2">
        <Button type="button" onClick={onPrint}>
          {tx(lang, "print")}
        </Button>
        <Button type="button" variant="secondary" onClick={onSave}>
          {tx(lang, "saveHtml")}
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          {tx(lang, "close")}
        </Button>
      </div>
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>,
    document.body,
  );
}
