"use client";

import { useEffect, useRef } from "react";

const FACTS = [
  "Coffee estate",
  "Pepper vines",
  "Pool",
  "Kids park",
  "Restaurant 7 AM to 10 PM",
  "13 rooms",
];

/** One slow strip of real facts. Pauses on hover and off-screen; static for reduced motion. */
export function FactsMarquee() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        el.setAttribute("data-paused", entry.isIntersecting ? "false" : "true"),
      { rootMargin: "50px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const row = (copy: number) =>
    FACTS.map((fact) => (
      <li
        key={`${copy}-${fact}`}
        aria-hidden={copy === 1 ? true : undefined}
        className="flex shrink-0 items-center gap-6"
      >
        <span className="label-mono whitespace-nowrap text-teal-deep">{fact}</span>
        <span aria-hidden="true" className="block h-1.5 w-1.5 shrink-0 bg-sand" />
      </li>
    ));

  return (
    <div
      ref={root}
      data-paused="true"
      aria-label="Jungle Hill at a glance"
      role="region"
      className="facts-marquee overflow-hidden bg-sand-light py-4"
    >
      <ul className="facts-marquee-track flex w-max gap-6">
        {row(0)}
        {row(1)}
      </ul>
    </div>
  );
}
