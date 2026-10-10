import { GalleryBrowser } from "@/components/sections/GalleryBrowser";
import { PageHero } from "@/components/shared/PageHero";
import { gallery, galleryCategories } from "@/data/gallery";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photographs of the rooms, pool, restaurant, games and grounds at Jungle Hill Resort, Coorg.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="07 — Gallery"
        lines={[{ text: "The property," }, { text: "as it ", emphasis: "is." }]}
        description={
          <p>
            Real photographs of the resort. Filter by category, or open any photo full
            size.
          </p>
        }
      />
      <section aria-label="Photographs" className="pb-12">
        <div className="page-container">
          <GalleryBrowser images={gallery} categories={galleryCategories} />
        </div>
      </section>
    </>
  );
}
