"use client";

import { useState } from "react";
import { Lightbox } from "@/components/shared/LazyLightbox";
import { Photo } from "@/components/shared/Photo";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryImage } from "@/types";

interface GalleryBrowserProps {
  images: GalleryImage[];
  categories: GalleryCategory[];
}

/** Category filters, masonry columns and a lightbox over the filtered set. */
export function GalleryBrowser({ images, categories }: GalleryBrowserProps) {
  const [active, setActive] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const visible =
    active === "All" ? images : images.filter((image) => image.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => {
              setActive(category);
              setOpen(null);
            }}
            className={cn(
              "label-mono min-h-11 border px-4 transition-colors",
              active === category
                ? "border-slate bg-slate text-pearl"
                : "border-night/30 hover:border-steel",
            )}
          >
            {category}
          </button>
        ))}
        <p className="label-mono ml-auto self-center text-steel" aria-live="polite">
          {visible.length} photos
        </p>
      </div>

      <ul className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((image, index) => (
          <li key={image.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Open photo: ${image.alt}`}
              className="group relative block w-full overflow-hidden"
            >
              <Photo
                image={image}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                imgClassName="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
              <span className="label-mono absolute bottom-0 left-0 bg-pearl px-3 py-2 text-[0.65rem] text-night">
                {image.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={visible}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </div>
  );
}
