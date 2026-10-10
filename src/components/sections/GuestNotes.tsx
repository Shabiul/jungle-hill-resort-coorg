"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

type Filter = "All" | "Family" | "Couple" | "Friends";
const FILTERS: Filter[] = ["All", "Family", "Couple", "Friends"];

/** All reviews as editorial columns, filterable by the trip type Google recorded. */
export function GuestNotes({ reviews }: { reviews: Testimonial[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? reviews
      : reviews.filter((review) => review.tripType?.includes(filter));
  const count = (value: Filter) =>
    value === "All"
      ? reviews.length
      : reviews.filter((r) => r.tripType?.includes(value)).length;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by trip type"
        className="flex flex-wrap items-center gap-2"
      >
        {FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={cn(
              "label-mono min-h-11 border px-4 transition-colors",
              filter === value
                ? "border-slate bg-slate text-pearl"
                : "border-night/30 hover:border-steel",
            )}
          >
            {value} · {count(value)}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-1 gap-8 md:columns-2 lg:columns-3">
        {visible.map((review) => (
          <li
            key={review.id}
            className="mb-8 break-inside-avoid border-t border-night pt-4"
          >
            <span
              aria-hidden="true"
              className="block font-display text-6xl leading-[0.6] text-steel"
            >
              &ldquo;
            </span>
            <blockquote className="mt-3 font-display text-xl leading-snug">
              {review.text}
            </blockquote>

            {review.details && (
              <dl className="label-mono mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.7rem] text-steel">
                <div className="flex gap-1.5">
                  <dt>Rooms</dt>
                  <dd className="text-night">{review.details.rooms.toFixed(1)}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Service</dt>
                  <dd className="text-night">{review.details.service.toFixed(1)}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Location</dt>
                  <dd className="text-night">{review.details.location.toFixed(1)}</dd>
                </div>
              </dl>
            )}
            {review.highlights && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {review.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="label-mono border border-night/30 px-2 py-1 text-[0.68rem]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            <footer className="mt-4 flex items-start gap-3">
              <span
                aria-hidden="true"
                className="label-mono grid h-10 w-10 shrink-0 place-items-center rounded-full border border-steel text-steel"
              >
                {review.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <div>
                <p className="font-display text-lg leading-tight">
                  {review.profileUrl ? (
                    <a
                      href={review.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {review.name}
                    </a>
                  ) : (
                    review.name
                  )}
                </p>
                <p className="label-mono text-[0.68rem] text-steel">
                  {[review.tripType, review.timeAgo].filter(Boolean).join(" · ")}
                </p>
                <p className="label-mono mt-1.5 flex items-center gap-3 text-[0.68rem]">
                  <span className="border border-night/40 px-2 py-0.5">Google</span>
                  <span>{review.rating}/5</span>
                </p>
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
