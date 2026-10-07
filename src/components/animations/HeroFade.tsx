"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useIntroReady } from "@/lib/intro-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroFadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Fade-up used for hero content; starts once the intro curtain has cleared. */
export function HeroFade({ children, delay = 0, className }: HeroFadeProps) {
  const ready = useIntroReady();
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={ready || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
