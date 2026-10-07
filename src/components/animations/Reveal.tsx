"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { fadeUp, pickVariants } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
}

export function Reveal({ children, variants = fadeUp, className }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={pickVariants(variants, reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
