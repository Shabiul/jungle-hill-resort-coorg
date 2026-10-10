import { existsSync } from "node:fs";
import path from "node:path";
import { imageManifest } from "@/data/generated/image-manifest";

export interface HeroSlide {
  /** How long the slide stays on screen, in milliseconds. */
  duration: number;
  type: "image" | "video";
  /** Path under /public. */
  src: string;
  /** Still shown before a video plays (and as its fallback). */
  poster?: string;
  alt: string;
  /** CSS object-position, so each slide can be framed on its own. */
  objectPosition?: string;
}

/**
 * Hero sequence, in order: photo A, photo B, then the video, then back to A.
 * Reorder or add entries freely. A video whose file is missing is skipped.
 */
export const heroSlides: HeroSlide[] = [
  {
    duration: 4000,
    type: "image",
    src: "/images/hero/hero-a-dusk-cottages.webp",
    alt: "Cottages and the main house at dusk with a white staircase, warm lights and a red paver driveway",
    objectPosition: "48% 62%",
  },
  {
    duration: 4000,
    type: "image",
    src: "/images/hero/hero-b-coffee-view.webp",
    alt: "View through coffee plants and bamboo down to red-roofed cottages, with misty hills at sunset",
    objectPosition: "50% 38%",
  },
  {
    duration: 4000, // plays its first 4 seconds only
    type: "video",
    src: "/videos/hero-rain-cloud-forest.mp4",
    poster: "/images/hero/hero-b-coffee-view.webp",
    alt: "Rain falling in a cloud forest of tall trees",
    objectPosition: "50% 50%",
  },
];

export interface ResolvedHeroSlide extends HeroSlide {
  /** Tiny blur placeholder for photos, from the image manifest. */
  blurDataURL?: string;
}

/** Server-side: drops slides whose file is missing and attaches blur placeholders. */
export function resolveHeroSlides(): ResolvedHeroSlide[] {
  return heroSlides
    .filter((slide) => existsSync(path.join(process.cwd(), "public", slide.src)))
    .map((slide) => ({ ...slide, blurDataURL: imageManifest[slide.src]?.blur }));
}
