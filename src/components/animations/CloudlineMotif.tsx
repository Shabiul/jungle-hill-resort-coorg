"use client";

import { m, useScroll, useSpring } from "motion/react";

/**
 * One thin contour line, taken from the mountain silhouette of the logo, that draws itself down the
 * edge of the page as you scroll. Desktop only, hidden for reduced motion, never takes the pointer.
 */
export function CloudlineMotif() {
  const { scrollYProgress } = useScroll();
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 1000"
      preserveAspectRatio="none"
      className="pointer-events-none fixed top-0 right-3 z-[5] hidden h-screen w-12 text-olive opacity-50 motion-reduce:hidden xl:block"
    >
      <m.path
        d="M30 0 C 30 80 10 120 14 190 L 34 250 L 20 310 C 12 380 44 420 38 500 L 50 560 L 26 640 C 16 720 40 760 32 840 L 22 900 C 18 950 30 980 30 1000"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: draw }}
      />
    </svg>
  );
}
