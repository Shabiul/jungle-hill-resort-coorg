import { CTA } from "@/components/sections/CTA";
import { MealTimetable } from "@/components/shared/MealTimetable";
import { PageHero } from "@/components/shared/PageHero";
import { PhotoGrid } from "@/components/shared/PhotoGrid";
import { dining } from "@/data/dining";
import { gallery } from "@/data/gallery";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Restaurant",
  description:
    "In-house restaurant serving South Indian, North Indian and Chinese food, 7:00 AM to 10:00 PM. Meal timings and ordering guidelines.",
  path: "/dining",
});

export default function DiningPage() {
  const photos = [
    ...dining.images,
    ...gallery.filter(
      (image) =>
        image.category === "Dining" && !dining.images.some((d) => d.src === image.src),
    ),
  ];

  return (
    <>
      <PageHero
        label="04 — Restaurant"
        lines={[{ text: "A table" }, { text: "in the ", emphasis: "estate." }]}
        description={
          <p>
            The in-house restaurant serves South Indian, North Indian and Chinese food
            through the day, from 7:00 AM to 10:00 PM.
          </p>
        }
      />

      <section
        aria-label="Meal times"
        className="dark-surface section-space bg-ink text-ivory"
      >
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MealTimetable meals={dining.meals} hours={dining.hours} />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Cuisines">
              {dining.cuisines.map((cuisine) => (
                <li key={cuisine} className="label-mono border border-ivory/40 px-3 py-2">
                  {cuisine}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="label-mono !font-mono text-xs text-brass-soft">
              Ordering guidelines
            </h2>
            <ul className="mt-4">
              {dining.guidelines.map((guideline) => (
                <li key={guideline} className="border-t border-ivory/20 py-4 text-lg">
                  {guideline}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section aria-label="Restaurant photographs" className="section-space">
          <div className="page-container">
            <p className="label-mono text-emerald">The restaurant</p>
            <h2 className="mt-4 mb-10 text-h3">Where you will eat</h2>
            <PhotoGrid images={photos} />
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
