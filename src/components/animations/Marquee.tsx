"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}

export function Marquee({ children, duration = 30, className }: MarqueeProps) {
  const reduced = useReducedMotion();

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        style={{ display: "flex", width: "max-content" }}
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div style={{ display: "flex" }}>{children}</div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
