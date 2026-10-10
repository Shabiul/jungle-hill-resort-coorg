"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Lightbox } from "@/components/shared/Lightbox";
import { Photo } from "@/components/shared/Photo";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface PhotoCarouselProps {
  images: ImageAsset[];
}

/** One large photo at a time with arrows, a thumbnail grid of every photo, and a lightbox. */
export function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length;
  if (!total) return null;
  const current = images[index];

  const go = (delta: number) => setIndex((value) => (value + delta + total) % total);

  return (
    <div
      onKeyDown={(event) => {
        if (open !== null) return;
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/9]">
        <button
          type="button"
          onClick={() => setOpen(index)}
          aria-label={`Open photo full size: ${current.alt}`}
          className="absolute inset-0 block h-full w-full cursor-zoom-in"
        >
          <Photo
            key={current.src}
            image={current}
            fill
            sizes="(min-width: 1344px) 1280px, 100vw"
            imgClassName="object-cover"
          />
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 sm:p-4">
          <span className="label-mono bg-ivory px-3 py-2 text-[0.7rem] text-ink">
            {index + 1} / {total}
          </span>
          <span className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="btn h-11 w-11 p-0"
            >
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="btn h-11 w-11 p-0"
            >
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label="Open full size"
              className="btn h-11 w-11 p-0"
            >
              <Expand size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm text-stone" aria-live="polite">
        {current.alt}
      </p>

      <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
        {images.map((image, thumbIndex) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(thumbIndex)}
              aria-label={`Show photo ${thumbIndex + 1}: ${image.alt}`}
              aria-current={thumbIndex === index ? "true" : undefined}
              className={cn(
                "relative block aspect-square w-full overflow-hidden border-2 transition-opacity",
                thumbIndex === index
                  ? "border-brass-deep"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Photo image={image} fill sizes="(min-width: 1024px) 10vw, 25vw" />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </div>
  );
}
