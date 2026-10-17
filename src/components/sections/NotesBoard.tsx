"use client";

import { useEffect, type CSSProperties } from "react";
import { m } from "motion/react";
import { PostcardName, Stamp } from "@/components/sections/Postcard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

// Tiny alternating tilts (degrees) for the two-column board; straight on mobile.
const TILTS = [-1.4, 1.1, 0.8, -1.2, 1.5, -0.7, 1.3, -1.5, 0.6, -1, 1.2, -0.8, 1.4, -1.1];

/** Briefly outlines the note a deep link (#note-id) points at. */
function usePulseOnTarget() {
  useEffect(() => {
    let timer: number | undefined;
    const pulse = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("note-")) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: "center" });
      el.classList.remove("note-pulse");
      void el.offsetWidth; // restart the animation
      el.classList.add("note-pulse");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => el.classList.remove("note-pulse"), 1800);
    };
    pulse();
    window.addEventListener("hashchange", pulse);
    return () => {
      window.removeEventListener("hashchange", pulse);
      window.clearTimeout(timer);
    };
  }, []);
}

/** All the notes as pinned postcards in a staggered two-column board. */
export function NotesBoard({ notes }: { notes: Testimonial[] }) {
  const reduced = useReducedMotion();
  usePulseOnTarget();

  return (
    <ul className="columns-1 gap-6 md:columns-2 md:gap-8">
      {notes.map((note, i) => (
        <li key={note.id} className="mb-6 break-inside-avoid md:mb-8">
          <m.div
            data-reveal
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <article
              id={`note-${note.id}`}
              style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
              className={cn(
                "relative scroll-mt-28 rounded-none border border-steel bg-vapour p-6 pt-9 text-graphite shadow-[0_14px_28px_-16px_rgba(13,19,25,0.7)] outline-2 outline-transparent transition-transform duration-300 sm:p-7 sm:pt-10",
                "md:[transform:rotate(var(--tilt))] md:hover:[transform:rotate(0deg)]",
              )}
            >
              {/* A pin on some notes, a strip of tape on the others */}
              {i % 2 === 0 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1.5 left-1/2 block h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-graphite/30 bg-champagne"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-2.5 left-1/2 block h-5 w-16 -translate-x-1/2 -rotate-2 bg-champagne/60"
                />
              )}
              <Stamp />
              <p className="font-display text-[1.3rem] leading-snug text-graphite italic sm:text-[1.45rem]">
                {note.text}
              </p>
              <div className="mt-5">
                <PostcardName note={note} />
              </div>
            </article>
          </m.div>
        </li>
      ))}
    </ul>
  );
}
