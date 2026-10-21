"use client";

import { m } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/** A thin line that draws itself once when it scrolls into view. Used under section labels and as a divider. */
export function AccentMark({
  className,
  tone = "teal",
}: {
  className?: string;
  tone?: "teal" | "hairline";
}) {
  const reduced = useReducedMotion();
  return (
    <m.span
      aria-hidden="true"
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.7, ease: easeOut }}
      className={cn(
        "pointer-events-none block h-px origin-left",
        tone === "teal" ? "w-12 bg-olive" : "w-full bg-current opacity-20",
        className,
      )}
    />
  );
}
