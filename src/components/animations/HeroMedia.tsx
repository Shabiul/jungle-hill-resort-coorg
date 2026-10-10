"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ResolvedHeroSlide } from "@/data/hero";
import { cn } from "@/lib/utils";

const IMAGE_MS = 6500;
const VIDEO_CAP_MS = 10000;
const FADE_MS = 1200;

type NetworkInfo = { connection?: { saveData?: boolean; effectiveType?: string } };

const noopSubscribe = () => () => {};

/** Video is skipped on Save-Data and slow connections. Server snapshot is false so markup matches. */
function videoAllowed() {
  const connection = (navigator as Navigator & NetworkInfo).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)(2g|3g)$/.test(connection.effectiveType))
    return false;
  return true;
}

/**
 * Hero background: a slow sequence of photo A, photo B and a video, with 1.2 s crossfades and a
 * gentle Ken Burns zoom on the photos. Reduced motion shows the first photo only.
 */
export function HeroMedia({ slides }: { slides: ResolvedHeroSlide[] }) {
  const reduced = useReducedMotion();
  const canPlayVideo = useSyncExternalStore(noopSubscribe, videoAllowed, () => false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 160]);

  const playable = slides.filter((slide) => slide.type === "image" || canPlayVideo);
  const total = playable.length;

  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [furthest, setFurthest] = useState(0);
  const [paused, setPaused] = useState(false);
  const videos = useRef<Record<number, HTMLVideoElement | null>>({});
  const videoFailed = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (total < 2) return;
      const target = ((next % total) + total) % total;
      setIndex((current) => {
        if (current === target) return current;
        setPrevious(current);
        return target;
      });
      setFurthest((value) => Math.max(value, Math.min(total - 1, target + 1)));
    },
    [total],
  );

  // Preload the next slide shortly after the first paint, so photo B is never in the critical path.
  useEffect(() => {
    if (reduced || total < 2) return;
    const id = window.setTimeout(() => setFurthest((value) => Math.max(value, 1)), 1500);
    return () => window.clearTimeout(id);
  }, [reduced, total]);

  // Advance: images after IMAGE_MS; the video when it ends (or at the cap).
  useEffect(() => {
    if (reduced || paused || total < 2) return;
    const slide = playable[index];
    if (!slide) return;
    const isVideo = slide.type === "video";
    const wait = isVideo ? (videoFailed.current ? 800 : VIDEO_CAP_MS) : IMAGE_MS;
    const id = window.setTimeout(() => goTo(index + 1), wait);
    return () => window.clearTimeout(id);
    // playable is derived from stable props and canPlayVideo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduced, total, goTo, canPlayVideo]);

  // The outgoing slide stays opaque underneath until the incoming one has fully faded in.
  useEffect(() => {
    if (previous === null) return;
    const id = window.setTimeout(() => setPrevious(null), FADE_MS + 100);
    return () => window.clearTimeout(id);
  }, [previous]);

  // Play the video only while its slide is active; pause and rewind it once hidden.
  useEffect(() => {
    playable.forEach((slide, i) => {
      if (slide.type !== "video") return;
      const video = videos.current[i];
      if (!video) return;
      if (i === index && !paused && !reduced) {
        void video.play().catch(() => {
          videoFailed.current = true;
        });
      } else if (i === index) {
        video.pause();
      } else if (i !== previous) {
        video.pause();
        video.currentTime = 0;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, previous, paused, reduced, furthest, canPlayVideo]);

  const visibleSlides = reduced ? playable.slice(0, 1) : playable;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-10 -bottom-10 isolate z-0"
        style={reduced ? undefined : { y }}
      >
        {visibleSlides.map((slide, i) => {
          if (i > furthest && i !== 0) return null;
          const active = i === index;
          const showing = active || i === previous;
          return (
            <div
              key={slide.src + i}
              className={cn(
                "absolute inset-0 [filter:saturate(0.88)_contrast(1.06)_hue-rotate(-4deg)]",
                "transition-opacity ease-in-out",
                showing ? "opacity-100" : "opacity-0",
                active ? "z-10" : "z-0",
              )}
              style={{ transitionDuration: reduced ? "0ms" : `${FADE_MS}ms` }}
            >
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  quality={80}
                  priority={i === 0}
                  placeholder={slide.blurDataURL ? "blur" : "empty"}
                  blurDataURL={slide.blurDataURL}
                  className={cn("object-cover", showing && !reduced && "hero-kb")}
                  style={{ objectPosition: slide.objectPosition }}
                />
              ) : (
                <video
                  ref={(node) => {
                    videos.current[i] = node;
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: slide.objectPosition }}
                  muted
                  playsInline
                  preload="metadata"
                  poster={slide.poster}
                  aria-hidden="true"
                  tabIndex={-1}
                  onEnded={() => active && goTo(index + 1)}
                  onError={() => {
                    videoFailed.current = true;
                  }}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              )}
            </div>
          );
        })}
      </motion.div>

      {!reduced && total > 1 && (
        <div className="absolute inset-x-0 bottom-2.5 z-20">
          <div className="page-container">
            <div
              role="group"
              aria-label="Hero slides"
              className="flex w-fit items-center gap-3"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                  setPaused(false);
              }}
            >
              <span
                className="label-mono text-[0.62rem] text-ivory/80"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="flex items-center">
                {playable.map((slide, i) => (
                  <button
                    key={slide.src + i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show slide ${i + 1} of ${total}: ${slide.type === "video" ? "video" : slide.alt}`}
                    aria-current={i === index ? "true" : undefined}
                    className="grid h-6 w-6 place-items-center"
                  >
                    <span
                      className={cn(
                        "block h-2 w-2 border border-ivory transition-colors",
                        i === index ? "bg-ivory" : "bg-transparent",
                      )}
                    />
                  </button>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
