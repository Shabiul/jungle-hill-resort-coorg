"use client";

import { useSyncExternalStore } from "react";

export type IntroStatus = "idle" | "playing" | "done";

let status: IntroStatus = "idle";
const listeners = new Set<() => void>();

export function setIntroStatus(next: IntroStatus) {
  if (status === next) return;
  status = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useIntroStatus(): IntroStatus {
  return useSyncExternalStore(
    subscribe,
    () => status,
    () => "idle",
  );
}

/** True once the intro has lifted (or was skipped). Hero entrance animations wait for this. */
export function useIntroReady(): boolean {
  return useIntroStatus() === "done";
}
