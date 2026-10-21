"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { easeOut } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Slow inner parallax (max 12px either way). Use on large images only. */
  parallax?: boolean;
}

/** Hard-edged clip-path reveal, once per image. */
export function RevealImage({
  children,
  className,
  delay = 0,
  parallax = false,
}: RevealImageProps) {
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const moving = parallax && !reduced;

  return (
    <m.div
      ref={frame}
      data-reveal-img
      className={cn(className, moving && "overflow-hidden")}
      initial={reduced ? false : { clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {moving ? (
        <m.div style={{ y }} className="scale-[1.08]">
          {children}
        </m.div>
      ) : (
        children
      )}
    </m.div>
  );
}
