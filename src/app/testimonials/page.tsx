import { CTA } from "@/components/sections/CTA";
import { GuestNotes } from "@/components/sections/GuestNotes";
import { PageHero } from "@/components/shared/PageHero";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Guest notes",
  description:
    "What guests say about Jungle Hill Resort, Coorg: 14 real reviews from Google, including the 4-star ones.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        label="Real reviews from Google"
        lines={[{ text: "Guest" }, { text: "", emphasis: "notes." }]}
        description={
          <p>
            All {testimonials.length} reviews, lightly tidied for spelling and nothing
            else. There is no overall score here, only what people wrote.
          </p>
        }
      />
      <section aria-label="All guest notes" className="pb-12">
        <div className="page-container">
          <GuestNotes reviews={testimonials} />
        </div>
      </section>
      <CTA />
    </>
  );
}
