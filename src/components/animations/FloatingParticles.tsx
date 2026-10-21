"use client";

import { useEffect, useRef } from "react";

// Six soft leaf-and-mist shapes: [left %, top %, size px, duration s, delay s]
const SHAPES: [number, number, number, number, number][] = [
  [8, 22, 54, 26, 0],
  [24, 68, 36, 32, -6],
  [46, 14, 28, 28, -12],
  [68, 62, 60, 34, -3],
  [84, 28, 40, 30, -9],
  [92, 74, 30, 36, -15],
];

/**
 * A few slow, very faint floating shapes. Desktop only, hidden for reduced motion, and paused when
 * off-screen. Decorative: never intercepts the pointer.
 */
export function FloatingParticles() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => el.setAttribute("data-paused", entry.isIntersecting ? "false" : "true"),
      { rootMargin: "50px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      data-paused="true"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden max-md:hidden motion-reduce:hidden"
    >
      {SHAPES.map(([left, top, size, duration, delay], i) => (
        <span
          key={i}
          className="particle absolute block rounded-[60%_40%_55%_45%] bg-aqua/10"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size * 0.62,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
