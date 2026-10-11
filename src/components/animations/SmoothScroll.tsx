"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Lenis smooth scroll, created once and destroyed on unmount. Off for reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, [reduced]);

  return <>{children}</>;
}
