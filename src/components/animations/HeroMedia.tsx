"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { VideoBackground } from "@/components/animations/VideoBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ImageAsset } from "@/types";

interface HeroMediaProps {
  poster: ImageAsset | null | undefined;
  sources: { src: string; type: "video/mp4" | "video/webm" }[];
}

/** Hero background with a gentle scroll parallax on top of the slow Ken Burns zoom. */
export function HeroMedia({ poster, sources }: HeroMediaProps) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 160]);

  return (
    <motion.div
      className="absolute inset-x-0 -top-10 -bottom-10"
      style={reduced ? undefined : { y }}
    >
      <VideoBackground poster={poster} sources={sources} priority zoom />
    </motion.div>
  );
}
