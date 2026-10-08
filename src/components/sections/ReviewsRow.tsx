"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/types";

interface ReviewsRowProps {
  reviews: Testimonial[];
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="flex w-[84vw] shrink-0 flex-col border border-ink bg-ivory p-6 sm:w-[26rem]">
      <span
        aria-hidden="true"
        className="font-display text-7xl leading-[0.6] text-brass-deep"
      >
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-1">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-start gap-3 border-t border-ink/25 pt-4">
        <span
          aria-hidden="true"
          className="label-mono grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass-deep text-brass-deep"
        >
          {review.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </span>
        <div>
          <p className="font-display text-xl">
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
          <p className="label-mono mt-1 text-ink/75">
            {[review.tripType, review.timeAgo].filter(Boolean).join(" · ")}
          </p>
          <p className="label-mono mt-3 flex items-center gap-3 text-[0.68rem]">
            <span className="border border-ink/40 px-2 py-1">Google</span>
            <span>{review.rating}/5</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Horizontally scrollable reviews. Drifts slowly until the visitor touches, hovers, focuses or
 * scrolls it; never drifts for reduced motion. Mouse drag, arrow buttons and keyboard all work.
 */
export function ReviewsRow({ reviews }: ReviewsRowProps) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let paused = false;
    let hovered = false;
    let visible = false;
    let position = el.scrollLeft;

    const stop = () => {
      paused = true;
    };
    const tick = () => {
      if (!paused && !hovered && visible) {
        position += 0.35;
        el.scrollLeft = position;
        if (position >= el.scrollWidth - el.clientWidth - 1) paused = true;
      } else {
        position = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);
    const events = ["pointerdown", "wheel", "focusin", "touchstart", "keydown"] as const;
    events.forEach((name) => el.addEventListener(name, stop, { passive: true }));
    const enter = () => {
      hovered = true;
    };
    const leave = () => {
      hovered = false;
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
      observer.disconnect();
      events.forEach((name) => el.removeEventListener(name, stop));
    };
  }, []);

  function scrollByCard(direction: 1 | -1) {
    scroller.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  }

  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2 px-[max(var(--spacing-gutter),calc((100vw-var(--container-page))/2+var(--spacing-gutter)))]">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous reviews"
          className="btn btn-outline h-11 w-11 p-0"
        >
          <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next reviews"
          className="btn btn-outline h-11 w-11 p-0"
        >
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <div
        ref={scroller}
        role="region"
        aria-label="Guest reviews from Google"
        tabIndex={0}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          drag.current = {
            active: true,
            startX: event.clientX,
            startScroll: scroller.current?.scrollLeft ?? 0,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current.active || !scroller.current) return;
          scroller.current.scrollLeft =
            drag.current.startScroll - (event.clientX - drag.current.startX);
        }}
        onPointerUp={() => (drag.current.active = false)}
        onPointerLeave={() => (drag.current.active = false)}
        className="flex cursor-grab items-stretch gap-5 overflow-x-auto px-[max(var(--spacing-gutter),calc((100vw-var(--container-page))/2+var(--spacing-gutter)))] pb-6 select-none active:cursor-grabbing"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
