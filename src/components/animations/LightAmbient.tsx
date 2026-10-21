"use client";

import { useEffect, useRef } from "react";

/** Wavy contour lines, generated once: a quiet topographic texture. */
function contourPaths() {
  const paths: string[] = [];
  for (let i = 0; i < 9; i++) {
    const baseY = 40 + i * 62;
    let d = `M0 ${baseY}`;
    for (let x = 0; x <= 1000; x += 50) {
      const y =
        baseY +
        Math.sin((x / 1000) * Math.PI * 2 + i * 0.7) * (14 + i * 2.2) +
        Math.sin((x / 1000) * Math.PI * 6 + i) * 5;
      d += ` L${x} ${y.toFixed(1)}`;
    }
    paths.push(d);
  }
  return paths;
}
const PATHS = contourPaths();

/**
 * Decorative background for light sections: slow-drifting teal contour lines and a soft mist band.
 * Transform-only loops that pause while off-screen and are hidden for reduced motion.
 */
export function LightAmbient() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => el.setAttribute("data-paused", entry.isIntersecting ? "false" : "true"),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      data-paused="true"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden"
    >
      <svg
        className="ambient-drift absolute top-0 left-0 h-full w-[200%] text-olive opacity-[0.14]"
        viewBox="0 0 2000 600"
        preserveAspectRatio="none"
      >
        {[0, 1000].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`} fill="none" stroke="currentColor">
            {PATHS.map((d, i) => (
              <path key={i} d={d} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        ))}
      </svg>
      <div className="ambient-mist absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
    </div>
  );
}
