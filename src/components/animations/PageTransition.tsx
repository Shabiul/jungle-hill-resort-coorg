"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
