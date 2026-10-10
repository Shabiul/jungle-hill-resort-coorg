"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

type Filter = "All" | "Family" | "Couple" | "Friends";
const FILTERS: Filter[] = ["All", "Family", "Couple", "Friends"];

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = () => window.location.hash;

/**
 * "A quiet ledger": a sticky title and text filters on the left, the notes in one calm column on
 * the right, separated by space only. Deep links (#note-id) scroll to a note and tint its label.
 */
export function GuestNotes({ reviews }: { reviews: Testimonial[] }) {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const hash = useSyncExternalStore(subscribeHash, getHash, () => "");
  const [dismissedFor, setDismissedFor] = useState("");

  const targetId = hash.startsWith("#note-") ? hash.slice(6) : null;
  const matches = (review: Testimonial, value: Filter) =>
    value === "All" || !!review.tripType?.includes(value);

  // A deep link to a note the current filter hides switches back to All.
  const targetHidden =
    targetId !== null &&
    reviews.some((review) => review.id === targetId) &&
    !matches(
      reviews.find((review) => review.id === targetId)!,
      filter,
    );
  const activeFilter: Filter = targetHidden ? "All" : filter;
  const visible = reviews.filter((review) => matches(review, activeFilter));

  // Scroll to a deep-linked note, then let its label tint fade after a moment.
  useEffect(() => {
    if (!targetId) return;
    const scroll = window.setTimeout(() => {
      document
        .getElementById(`note-${targetId}`)
        ?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
    }, 350);
    const dismiss = window.setTimeout(() => setDismissedFor(hash), 3500);
    return () => {
      window.clearTimeout(scroll);
      window.clearTimeout(dismiss);
    };
  }, [targetId, hash, reduced]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <p className="label-mono text-champagne">Guest Notes</p>
        <h1 className="mt-4 text-h2">What guests wrote</h1>
        <p className="mt-4 text-mist">Real reviews from Google</p>

        <div
          role="group"
          aria-label="Filter by trip type"
          className="label-mono -mx-[var(--spacing-gutter)] mt-8 flex gap-7 overflow-x-auto px-[var(--spacing-gutter)] whitespace-nowrap lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0"
        >
          {FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={activeFilter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "min-h-11 text-left text-[0.72rem] tracking-[0.22em] uppercase transition-colors lg:min-h-0",
                activeFilter === value ? "text-champagne" : "text-mist hover:text-pearl",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <ol className="space-y-20 sm:space-y-24 lg:col-span-7 lg:col-start-6">
        {visible.map((review) => {
          const highlighted = targetId === review.id && dismissedFor !== hash;
          return (
            <motion.li
              key={review.id}
              id={`note-${review.id}`}
              data-reveal
              className="scroll-mt-28"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <blockquote className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] leading-[1.4] font-light [text-wrap:pretty] text-pearl">
                {review.text}
              </blockquote>
              <p
                className={cn(
                  "label-mono mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] transition-colors duration-700",
                  highlighted ? "text-champagne" : "text-mist",
                )}
              >
                <span className={highlighted ? "text-champagne" : "text-pearl"}>
                  {review.profileUrl ? (
                    <a
                      href={review.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-champagne"
                    >
                      {review.name}
                    </a>
                  ) : (
                    review.name
                  )}
                </span>
                <span>
                  {[review.tripType, review.timeAgo].filter(Boolean).join(" · ")}
                </span>
                <span>Google</span>
              </p>
              {(review.details || review.highlights) && (
                <p className="mt-2 text-small text-mist">
                  {review.details &&
                    `Rooms ${review.details.rooms.toFixed(1)} · Service ${review.details.service.toFixed(1)} · Location ${review.details.location.toFixed(1)}`}
                  {review.details && review.highlights ? " · " : ""}
                  {review.highlights?.join(", ")}
                </p>
              )}
            </motion.li>
          );
        })}

        <li className="pt-8 sm:pt-12">
          <h2 className="font-display text-h4 font-light">Planning a stay?</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/booking" className="btn btn-primary">
              Enquire Now
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline gap-2"
            >
              <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </li>
      </ol>
    </div>
  );
}
