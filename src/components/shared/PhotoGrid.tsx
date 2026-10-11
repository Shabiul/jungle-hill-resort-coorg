"use client";

import { useState } from "react";
import { Lightbox } from "@/components/shared/LazyLightbox";
import { Photo } from "@/components/shared/Photo";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface PhotoGridProps {
  images: ImageAsset[];
}

/** Room photo grid. The first photo is large; every photo opens in the lightbox. */
export function PhotoGrid({ images }: PhotoGridProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <li key={image.src} className={cn(index === 0 && "col-span-2 row-span-2")}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Open photo: ${image.alt}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden"
            >
              <Photo
                image={image}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
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
    </>
  );
}
