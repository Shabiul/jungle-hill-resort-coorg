"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Hard-edged clip-path reveal, once per image. */
export function RevealImage({ children, className, delay = 0 }: RevealImageProps) {
  const reduced = useReducedMotion();

  return (
    <m.div
      data-reveal-img
      className={className}
      initial={reduced ? false : { clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </m.div>
  );
}
