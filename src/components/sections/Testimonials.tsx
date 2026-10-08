import { FeaturedReview } from "@/components/sections/FeaturedReview";
import { ReviewsRow } from "@/components/sections/ReviewsRow";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="What guests say on Google"
      className="section-space overflow-hidden"
    >
      <div className="page-container">
        <SectionHeader
          label="06 / Reviews"
          lines={[{ text: "What guests say" }, { text: "on ", emphasis: "Google." }]}
          description={
            <p>
              Real reviews, lightly tidied for spelling. The 4-star ones are here too.
            </p>
          }
        />
      </div>
      <div className="page-container mt-12">
        <FeaturedReview reviews={testimonials} />
      </div>
      <div className="mt-16">
        <ReviewsRow reviews={testimonials} />
      </div>
    </section>
  );
}
