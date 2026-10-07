"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Current vertical scroll offset in px (0 on the server). */
export function useScrollPosition(): number {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY,
    () => 0,
  );
}
