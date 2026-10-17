"use client";

import { useState, type ReactNode } from "react";
import { Lightbox } from "@/components/shared/LazyLightbox";
import { Photo } from "@/components/shared/Photo";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface BentoGalleryProps {
  images: ImageAsset[];
  /** Placed over the large first tile (the glass quick-facts panel). */
  overlay?: ReactNode;
}

const spans = [
  "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto",
  "aspect-square sm:aspect-auto",
  "aspect-square sm:aspect-auto",
  "aspect-square sm:aspect-auto",
  "aspect-square sm:aspect-auto",
];

/** Bento box gallery: one large photo and four small ones; the last opens the full set. */
export function BentoGallery({ images, overlay }: BentoGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = images.slice(0, 5);
  const more = images.length - 5;

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-3 lg:h-[34rem]">
        {shown.map((image, index) => {
          const isLast = index === shown.length - 1 && more > 0;
          return (
            <li key={image.src} className={cn("relative min-h-0", spans[index])}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={
                  isLast ? `+${more + 1} photos: show all ${images.length}` : `Open photo: ${image.alt}`
                }
                className="group absolute inset-0 block overflow-hidden"
              >
                <Photo
                  image={image}
                  fill
                  priority={index === 0}
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, 50vw"
                  }
                  imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                {isLast && (
                  <span className="label-mono absolute inset-0 grid place-items-center bg-espresso/65 text-cream">
                    +{more + 1} photos
                  </span>
                )}
              </button>
              {index === 0 && overlay && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  {overlay}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <Lightbox
        images={images}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </>
  );
}
