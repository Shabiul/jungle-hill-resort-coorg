import Link from "next/link";
import { GuestBook } from "@/components/sections/GuestBook";
import { PullQuoteRibbon } from "@/components/sections/PullQuoteRibbon";
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
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            label="04 — Guest notes"
            lines={[{ text: "What guests say" }, { text: "on ", emphasis: "Google." }]}
            description={
              <p>
                Real reviews, lightly tidied for spelling. The 4-star ones are here too.
              </p>
            }
          />
          <Link href="/testimonials" className="btn btn-outline self-start sm:self-end">
            Read all guest notes
          </Link>
        </div>
        <div className="mt-8">
          <GuestBook reviews={testimonials} />
        </div>
      </div>
      <div className="mt-10">
        <PullQuoteRibbon />
      </div>
    </section>
  );
}
