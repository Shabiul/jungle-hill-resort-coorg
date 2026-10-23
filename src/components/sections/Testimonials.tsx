import dynamic from "next/dynamic";
import { Photo } from "@/components/shared/Photo";
import { spokenNotes } from "@/data/testimonials";
import { photo } from "@/lib/images";

// Split into its own chunk (still server-rendered) so the first load hydrates less.
const GuestCarousel = dynamic(() =>
  import("@/components/sections/GuestCarousel").then((m) => m.GuestCarousel),
);

const backdrop = photo(
  "/images/gallery/grounds-misty-valley.jpg",
  "Mist over the valley beyond the resort's tiled roofs",
);

/** Home page guest notes: one compact row of equal cards over a faint, still photograph. */
export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="Guest notes"
      className="relative isolate overflow-hidden bg-surface py-8 text-body sm:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-20"
      >
        <Photo image={backdrop} fill sizes="100vw" />
      </div>
      <div className="page-container lg:pr-20">
        <GuestCarousel notes={spokenNotes} />
      </div>
    </section>
  );
}
