export function burstConfetti() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fursan:confetti"));
}
