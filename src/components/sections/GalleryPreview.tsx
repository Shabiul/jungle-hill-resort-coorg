import Link from "next/link";
import { RevealImage } from "@/components/animations/RevealImage";
import { Photo } from "@/components/shared/Photo";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils";

const spans = [
  "col-span-7 aspect-[4/3]",
  "col-span-5 aspect-[4/5]",
  "col-span-4 aspect-square",
  "col-span-8 aspect-[16/9]",
];

export function GalleryPreview() {
  // Spread across categories so the strip is not four pictures of the same thing.
  const seen = new Set<string>();
  const picks = gallery
    .filter((image) => !seen.has(image.category) && !!seen.add(image.category))
    .slice(0, 4);
  const items = picks.length >= 4 ? picks : gallery.slice(0, 4);

  return (
    <section id="gallery" aria-label="Gallery" className="section-space bg-vapour">
      <div className="page-container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            label="07 / Gallery"
            lines={[{ text: "The property," }, { text: "as it ", emphasis: "is." }]}
          />
          <Link href="/gallery" className="btn btn-outline self-start sm:self-end">
            All photographs
          </Link>
        </div>

        <ul className="mt-8 grid auto-rows-[13rem] grid-cols-12 gap-3 sm:auto-rows-[17rem] sm:gap-4">
          {items.map((image, index) => (
            <li key={image.src} className={cn(spans[index % spans.length])}>
              <RevealImage className="h-full" delay={index * 0.06}>
                <div className="relative h-full w-full overflow-hidden">
                  <Photo image={image} fill sizes="(min-width: 1024px) 50vw, 90vw" />
                  <span className="label-mono absolute bottom-0 left-0 bg-pearl px-3 py-2 text-[0.65rem] text-night">
                    {image.category}
                  </span>
                </div>
              </RevealImage>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
