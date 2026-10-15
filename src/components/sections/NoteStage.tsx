"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const ADVANCE_MS = 9000;

/**
 * One guest note at a time. All notes share one grid cell, so the stage is always as tall as the
 * tallest note and nothing jumps when the quote changes. Auto-advances slowly; pauses on hover,
 * focus and when the tab is hidden; never auto-advances for reduced motion.
 */
export function NoteStage({ notes }: { notes: Testimonial[] }) {
  const reduced = useReducedMotion();
  const total = notes.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const swipeStart = useRef<number | null>(null);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = hovered || focused || tabHidden;

  useEffect(() => {
    if (reduced || paused || total < 2) return;
    const id = window.setTimeout(
      () => setIndex((value) => (value + 1) % total),
      ADVANCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, total]);

  const go = (delta: number) => setIndex((value) => (value + delta + total) % total);
  const current = notes[index];
  if (!current) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Guest notes"
      tabIndex={0}
      className="relative touch-pan-y outline-offset-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return;
        const delta = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
      }}
    >
      {/* Single ornament: a large, faint champagne quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-1 font-display text-[9rem] leading-none text-champagne/35 select-none sm:-top-10 sm:text-[13rem]"
      >
        &ldquo;
      </span>

      {/* Screen readers hear only the current note */}
      <p className="sr-only" aria-live="polite">
        {current.excerpt ?? current.text} {current.name}.
      </p>

      <div className="relative grid max-w-[900px] pt-6 sm:pt-10">
        {notes.map((note, i) => {
          const active = i === index;
          const text = note.excerpt ?? note.text;
          return (
            <figure
              key={note.id}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "col-start-1 row-start-1 transition-[opacity,transform] ease-out",
                active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0",
              )}
              style={{ transitionDuration: reduced ? "0ms" : "600ms" }}
            >
              <blockquote className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.25] font-light [text-wrap:pretty] text-pearl">
                {text}
              </blockquote>
              <figcaption className="label-mono mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem]">
                <span className="text-pearl">{note.name}</span>
                <span className="text-mist">
                  {[note.tripType, note.timeAgo].filter(Boolean).join(" · ")}
                </span>
                <span className="text-mist">Google</span>
              </figcaption>
              {note.excerpt && (
                <Link
                  href={`/testimonials#note-${note.id}`}
                  className="label-mono mt-4 inline-block text-[0.7rem] text-champagne transition-colors hover:text-champagne-soft"
                >
                  Read the full note
                </Link>
              )}
            </figure>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-5">
        <p className="font-display text-2xl text-pearl tabular-nums" aria-hidden="true">
          <span className="text-champagne">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-mist"> / {String(total).padStart(2, "0")}</span>
        </p>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous guest note"
          className="grid h-11 w-11 place-items-center rounded-full border border-champagne/60 text-pearl transition-colors hover:border-champagne-soft"
        >
          <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next guest note"
          className="grid h-11 w-11 place-items-center rounded-full border border-champagne/60 text-pearl transition-colors hover:border-champagne-soft"
        >
          <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
