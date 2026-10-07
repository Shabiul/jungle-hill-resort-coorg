"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// TODO: wire up via app/template.tsx once the transition design is decided
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
