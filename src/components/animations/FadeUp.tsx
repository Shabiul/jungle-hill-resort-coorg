"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Fades up once on first view. Give each sibling its `index` for a 60 ms stagger. */
export function FadeUp({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      data-reveal
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.5, ease: easeOut, delay: Math.min(index, 8) * 0.06 }}
    >
      {children}
    </m.div>
  );
}
