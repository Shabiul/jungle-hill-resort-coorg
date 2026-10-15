import { GalleryBrowser } from "@/components/sections/GalleryBrowser";
import { PageHero } from "@/components/shared/PageHero";
import { gallery, galleryCategories } from "@/data/gallery";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { PageNote } from "@/components/shared/PageNote";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Browse photographs of the rooms, pool, restaurant, games and grounds at Jungle Hill Resort, a coffee and pepper plantation retreat near Madikeri, Coorg.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Gallery", path: "/gallery" }])} />
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
      <section aria-label="Photographs" className="pb-[var(--space-section)]">
        <div className="page-container">
          <GalleryBrowser images={gallery} categories={galleryCategories} />
        </div>
      </section>
      <PageNote>
        Every photograph here was taken at the resort. For the full picture of each room, see <Link href="/rooms">stays</Link>, and for how to get here from Madikeri, <Link href="/plan-your-stay">plan your stay</Link>.
      </PageNote>
    </>
  );
}
