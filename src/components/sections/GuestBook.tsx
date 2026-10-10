"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const ADVANCE_MS = 9000;

/**
 * "Guest book": one large quote, and an index of every reviewer beside it. Hover, focus or click a
 * name to read their note. It turns the pages slowly by itself and stops while you interact.
 */
export function GuestBook({ reviews }: { reviews: Testimonial[] }) {
  const reduced = useReducedMotion();
  const start = Math.max(
    0,
    reviews.findIndex((review) => review.id === "nithinkumar-h-r"),
  );
  const [index, setIndex] = useState(start);
  const [paused, setPaused] = useState(false);
  const total = reviews.length;

  useEffect(() => {
    if (paused || reduced || total < 2) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % total),
      ADVANCE_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduced, total, index]);

  const review = reviews[index];
  if (!review) return null;
  const long = review.text.length > 320;

  return (
    <div
      className="grid gap-6 lg:grid-cols-12 lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setPaused(false);
      }}
    >
      <figure className="lg:col-span-8">
        <span
          aria-hidden="true"
          className="block font-display text-[8rem] leading-[0.55] text-brass sm:text-[11rem]"
        >
          &ldquo;
        </span>
        <div aria-live={paused ? "polite" : "off"} className="min-h-[15rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={review.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}
            >
              <blockquote
                className={cn(
                  "font-display",
                  long ? "text-h4 leading-snug" : "text-h3 leading-[1.15]",
                )}
              >
                {review.text}
              </blockquote>
              <figcaption className="label-mono mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>{review.name}</span>
                <span className="text-stone">
                  {[review.tripType, review.timeAgo].filter(Boolean).join(" · ")}
                </span>
                <span className="border border-ink/40 px-2 py-1 text-[0.68rem]">
                  Google
                </span>
                <span>{review.rating}/5</span>
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </div>
      </figure>

      <nav aria-label="Guest reviewers" className="lg:col-span-4">
        <p className="label-mono mb-3 text-emerald">
          Guest notes · {index + 1} / {total}
        </p>
        <ol
          data-lenis-prevent
          className="max-h-[26rem] overflow-y-auto border-t border-ink pr-1"
        >
          {reviews.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <li key={item.id} className="border-b border-ink/20">
                <button
                  type="button"
                  aria-current={active ? "true" : undefined}
                  onMouseEnter={() => setIndex(itemIndex)}
                  onFocus={() => setIndex(itemIndex)}
                  onClick={() => setIndex(itemIndex)}
                  className={cn(
                    "grid min-h-11 w-full grid-cols-[2rem_1fr] items-baseline gap-2 border-l-2 py-2.5 pl-3 text-left transition-colors",
                    active
                      ? "border-brass bg-linen"
                      : "border-transparent hover:bg-linen/60",
                  )}
                >
                  <span className="label-mono text-brass-deep">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-tight">
                      {item.name}
                    </span>
                    <span className="label-mono block text-[0.68rem] text-stone">
                      {[item.tripType, item.timeAgo].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
