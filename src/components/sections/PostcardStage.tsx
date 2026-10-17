"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { m } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostcardName, Stamp } from "@/components/sections/Postcard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { PostcardNote } from "@/components/sections/Postcard";

const AUTO_MS = 9000;
const SPRING = { type: "spring", stiffness: 150, damping: 21, mass: 0.9 } as const;

// Resting pose of each depth in the stack: [rotate deg, x px, y px, scale]
const POSES: [number, number, number, number][] = [
  [0.6, 0, 0, 1],
  [-2.4, 12, 10, 0.97],
  [2.7, -10, 19, 0.94],
  [-1.3, 16, 27, 0.91],
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Postcards from the guests: a stack where the front card goes to the back on click, swipe, arrow
 * keys or the chevrons. Cards have a fixed size, so nothing moves when the note changes.
 */
export function PostcardStage({ notes }: { notes: PostcardNote[] }) {
  const reduced = useReducedMotion();
  const total = notes.length;
  const [front, setFront] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hiddenTab, setHiddenTab] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const go = useCallback(
    (step: number) => setFront((i) => (i + step + total) % total),
    [total],
  );

  useEffect(() => {
    const onVisibility = () => setHiddenTab(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = hovered || focused || hiddenTab || reduced;
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(1), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [front, paused, go]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  const current = notes[front];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Guest postcards"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="relative outline-offset-8 focus-visible:outline-2 focus-visible:outline-champagne"
    >
      {/* Oversized outlined word behind the stack */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-center font-display text-[clamp(5rem,20vw,16rem)] leading-none whitespace-nowrap text-transparent opacity-[0.12] select-none [-webkit-text-stroke:1px_var(--color-champagne-soft)]"
      >
        Thank you
      </span>

      <div className="relative mx-auto h-[28.5rem] w-full max-w-[34rem] touch-pan-y sm:h-[29.5rem]">
        {notes.map((note, i) => {
          const depth = (i - front + total) % total;
          const visible = depth < POSES.length;
          const isFront = depth === 0;
          const [rotate, x, y, scale] = reduced
            ? [0, 0, 0, 1]
            : (POSES[depth] ?? POSES[POSES.length - 1]);
          return (
            <m.article
              key={note.id}
              aria-hidden={!isFront}
              inert={!isFront}
              initial={false}
              animate={{
                rotate,
                x,
                y,
                scale,
                opacity: reduced ? (isFront ? 1 : 0) : visible ? 1 : 0,
              }}
              transition={reduced ? { duration: 0.3 } : SPRING}
              style={{ zIndex: total - depth }}
              onClick={
                isFront ? () => !window.getSelection()?.toString() && go(1) : undefined
              }
              onPointerDown={
                isFront ? (e) => (swipeStart.current = e.clientX) : undefined
              }
              onPointerUp={
                isFront
                  ? (e) => {
                      if (swipeStart.current === null) return;
                      const delta = e.clientX - swipeStart.current;
                      swipeStart.current = null;
                      if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
                    }
                  : undefined
              }
              className={cn(
                "absolute inset-x-0 top-0 flex h-[26rem] flex-col rounded-none border border-steel bg-vapour p-6 pt-8 text-graphite shadow-[0_14px_28px_-14px_rgba(13,19,25,0.7)] sm:h-[27rem] sm:p-8 sm:pt-10",
                isFront ? "cursor-pointer" : "pointer-events-none max-sm:!opacity-0",
              )}
            >
              <Stamp />
              <div
                data-lenis-prevent
                tabIndex={isFront ? 0 : -1}
                aria-label={isFront ? `Note by ${note.name}` : undefined}
                className="min-h-0 flex-1 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_calc(100%-2rem),transparent)] pr-1 pb-6 focus-visible:outline-2 focus-visible:outline-champagne"
              >
                <p className="font-display text-[1.35rem] leading-snug text-graphite italic sm:text-[1.55rem]">
                  {note.text}
                </p>
              </div>
              <div className="pt-4">
                <PostcardName note={note} />
              </div>
            </m.article>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Note ${front + 1} of ${total}, by ${current.name}: ${current.text}`}
      </p>

      <div className="mx-auto mt-4 flex max-w-[34rem] items-center justify-between sm:mt-5">
        <p className="font-display text-2xl text-pearl tabular-nums" aria-hidden="true">
          <span className="text-champagne-soft">{pad(front + 1)}</span>
          <span className="text-pearl/60"> / {pad(total)}</span>
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous guest note"
            className="grid h-11 w-11 place-items-center rounded-full border border-champagne/60 text-pearl transition-colors hover:border-champagne hover:text-champagne-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          >
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next guest note"
            className="grid h-11 w-11 place-items-center rounded-full border border-champagne/60 text-pearl transition-colors hover:border-champagne hover:text-champagne-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          >
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
