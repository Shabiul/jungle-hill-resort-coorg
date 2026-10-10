"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/shared/Photo";
import { gsap } from "@/lib/gsap";
import type { Room } from "@/types";

interface HorizontalRoomsProps {
  rooms: Room[];
}

/**
 * The one pinned moment on the home page. On desktop the section pins and the rooms slide
 * sideways as you scroll; on mobile and for reduced motion it is a plain scrollable row.
 */
export function HorizontalRooms({ rooms }: HorizontalRoomsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-vapour lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
    >
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Room categories, scroll sideways"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--spacing-gutter)] py-16 lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible lg:py-0"
      >
        {rooms.map((room) => (
          <article
            key={room.slug}
            className="w-[82vw] shrink-0 snap-center sm:w-[26rem] lg:w-[min(34vw,32rem)]"
          >
            <Link href={`/rooms/${room.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  image={room.images[0]}
                  fill
                  sizes="(min-width: 1024px) 34vw, 82vw"
                  imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-night pt-4">
                <span className="font-display text-5xl leading-none">{room.number}</span>
                <span className="label-mono text-steel">
                  {room.category} · {room.sizeSqFt} sq ft
                </span>
              </div>
              <h3 className="mt-4 text-3xl decoration-1 underline-offset-4 group-hover:underline sm:text-4xl">
                {room.name}
              </h3>
              <p className="mt-3 max-w-md text-night/80">{room.summary}</p>
              <p className="label-mono mt-4 flex items-center gap-2 text-steel">
                {room.rateNote}
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </p>
            </Link>
          </article>
        ))}
        <div className="flex w-[70vw] shrink-0 snap-center items-center sm:w-[18rem] lg:w-[22rem]">
          <Link href="/rooms" className="btn btn-dark">
            All rooms and policies
          </Link>
        </div>
      </div>
    </div>
  );
}
