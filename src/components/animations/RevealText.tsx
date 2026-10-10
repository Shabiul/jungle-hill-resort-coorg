"use client";

import { motion } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useIntroReady } from "@/lib/intro-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface HeadingLine {
  text?: string;
  /** Rendered in italic with the brass accent. */
  emphasis?: string;
  /** Plain text after the emphasised word. */
  after?: string;
}

interface RevealTextProps {
  /** One entry per visual line; each line is masked and slides up. Plain data, so it serialises. */
  lines: HeadingLine[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on load (after the intro) instead of when scrolled into view. */
  immediate?: boolean;
  /** True on dark backgrounds: the emphasis uses the lighter brass. */
  onDark?: boolean;
}

export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
  onDark = false,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const introReady = useIntroReady();

  const trigger = immediate
    ? { animate: introReady ? { y: "0%" } : { y: "110%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            data-reveal
            className="block"
            initial={reduced ? false : { y: "110%" }}
            transition={{ duration: 0.8, ease: easeOut, delay: delay + index * 0.09 }}
            {...trigger}
          >
            {line.text}
            {line.emphasis && (
              <em
                className={cn(
                  "font-light italic",
                  onDark ? "text-champagne-soft" : "text-steel",
                )}
              >
                {line.emphasis}
              </em>
            )}
            {line.after}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
