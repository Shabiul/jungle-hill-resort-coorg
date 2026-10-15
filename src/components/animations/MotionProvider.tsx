"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";

// The animation features load after the page is interactive, so they never delay the first paint.
const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
