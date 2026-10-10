"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/types";

/** One large quote at a time, switchable. All reviews are real Google reviews; no aggregate score. */
export function FeaturedReview({ reviews }: { reviews: Testimonial[] }) {
  const start = Math.max(
    0,
    reviews.findIndex((review) => review.id === "nithinkumar-h-r"),
  );
  const [index, setIndex] = useState(start);
  const review = reviews[index];
  if (!review) return null;
  const total = reviews.length;

  return (
    <figure className="grid gap-8 border-t border-night pt-10 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <span
          aria-hidden="true"
          className="block font-display text-8xl leading-[0.6] text-steel"
        >
          &ldquo;
        </span>
        <blockquote
          aria-live="polite"
          className="mt-4 font-display text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.15]"
        >
          {review.text}
        </blockquote>
        <figcaption className="label-mono mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>{review.name}</span>
          <span className="text-steel">
            {[review.tripType, review.timeAgo].filter(Boolean).join(" · ")}
          </span>
          <span className="border border-night/40 px-2 py-1 text-[0.68rem]">Google</span>
          <span>{review.rating}/5</span>
        </figcaption>
      </div>
      <div className="flex items-end gap-2 lg:col-span-3 lg:justify-end">
        <button
          type="button"
          onClick={() => setIndex((index - 1 + total) % total)}
          aria-label="Previous featured review"
          className="btn btn-outline h-11 w-11 p-0"
        >
          <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <span className="label-mono px-2" aria-hidden="true">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % total)}
          aria-label="Next featured review"
          className="btn btn-outline h-11 w-11 p-0"
        >
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </figure>
  );
}
