"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * One IntersectionObserver for every reveal on the page. Elements get `is-in` the first time they
 * are seen (CSS does the fade and rise), then they are no longer watched.
 */
let observer: IntersectionObserver | null = null;
function watch(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-in");
    return;
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px" },
  );
  observer.observe(el);
}

interface FadeUpProps {
  children: ReactNode;
  /** Position among siblings: each step adds 60 ms. */
  index?: number;
  /** Rise distance in px. */
  rise?: number;
  className?: string;
}

/** Fades up once on first view. Transform and opacity only; static for reduced motion. */
export function FadeUp({ children, index = 0, rise = 16, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) watch(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={`reveal${className ? ` ${className}` : ""}`}
      style={
        {
          "--reveal-delay": `${Math.min(index, 8) * 60}ms`,
          "--rise": `${rise}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
