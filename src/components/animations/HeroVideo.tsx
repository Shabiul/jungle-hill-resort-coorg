"use client";

import { useState, useSyncExternalStore } from "react";
import { Photo } from "@/components/shared/Photo";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface VideoSource {
  src: string;
  type: "video/mp4" | "video/webm";
}

interface HeroVideoProps {
  poster: ImageAsset | null | undefined;
  /** Atmospheric clips, e.g. /videos/hero-mist.webm. The poster shows until one can play. */
  sources?: VideoSource[];
  priority?: boolean;
  className?: string;
}

type NetworkInfo = { connection?: { saveData?: boolean; effectiveType?: string } };

function subscribe(onChange: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function allowVideo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & NetworkInfo).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)(2g|3g)$/.test(connection.effectiveType))
    return false;
  return true;
}

/**
 * Full-bleed background: poster photo first, a muted looping video on top once it can play.
 * Skipped entirely for reduced motion, save-data and slow connections.
 */
export function HeroVideo({
  poster,
  sources = [],
  priority = false,
  className,
}: HeroVideoProps) {
  const allowed = useSyncExternalStore(subscribe, allowVideo, () => false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const showVideo = allowed && !failed && sources.length > 0;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="hero-zoom absolute inset-0">
        <Photo image={poster} fill priority={priority} sizes="100vw" />
      </div>
      {showVideo && (
        <video
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          autoPlay
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
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              onError={() => setFailed(true)}
            />
          ))}
        </video>
      )}
    </div>
  );
}
