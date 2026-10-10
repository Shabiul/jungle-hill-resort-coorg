"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GradeTint } from "@/components/shared/GradeTint";
import { Photo } from "@/components/shared/Photo";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

export interface VideoSource {
  src: string;
  type: "video/mp4" | "video/webm";
}

interface VideoBackgroundProps {
  /** Real photo shown first, and kept as the fallback when there is no video or it is not allowed. */
  poster: ImageAsset | null | undefined;
  /** Clips that exist in /public/videos. An empty list means photo only. */
  sources?: VideoSource[];
  priority?: boolean;
  /** Slow Ken Burns zoom on the photo. */
  zoom?: boolean;
  sizes?: string;
  className?: string;
}

type NetworkInfo = { connection?: { saveData?: boolean; effectiveType?: string } };

function subscribe(onChange: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function videoAllowed() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & NetworkInfo).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)(2g|3g)$/.test(connection.effectiveType))
    return false;
  return true;
}

/**
 * Full-bleed background: a real photo, with a muted looping video on top when one exists and the
 * visitor allows it. The video only plays while on screen, and never for reduced motion, Save-Data
 * or slow connections.
 */
export function VideoBackground({
  poster,
  sources = [],
  priority = false,
  zoom = false,
  sizes = "100vw",
  className,
}: VideoBackgroundProps) {
  const allowed = useSyncExternalStore(subscribe, videoAllowed, () => false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const showVideo = allowed && !failed && sources.length > 0;

  useEffect(() => {
    const element = container.current;
    if (!element || !showVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const media = video.current;
        if (!media) return;
        if (entry.isIntersecting) void media.play().catch(() => undefined);
        else media.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div ref={container} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0", zoom && "hero-zoom")}>
        <Photo image={poster} fill priority={priority} sizes={sizes} />
      </div>
      {showVideo && (
        <video
          ref={video}
          className={cn(
            "grade-filter absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster?.src}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      )}
      {showVideo && ready && <GradeTint />}
    </div>
  );
}
