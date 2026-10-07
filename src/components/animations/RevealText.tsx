"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  /** One entry per visual line; each line is masked and slides up. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on load instead of when scrolled into view (hero). */
  immediate?: boolean;
}

export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const trigger = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className={cn("block")}
            initial={reduced ? false : { y: "110%" }}
            transition={{ duration: 0.8, ease: easeOut, delay: delay + index * 0.09 }}
            {...trigger}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
