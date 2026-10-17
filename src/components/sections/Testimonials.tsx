import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import dynamic from "next/dynamic";
import { Photo } from "@/components/shared/Photo";
import { testimonials } from "@/data/testimonials";
import { photo } from "@/lib/images";

// Split into its own chunk (still server-rendered) so the first load hydrates less.
const PostcardStage = dynamic(() =>
  import("@/components/sections/PostcardStage").then((m) => m.PostcardStage),
);

const backdrop = photo(
  "/images/gallery/grounds-misty-valley.jpg",
  "Mist over the valley beyond the resort's tiled roofs",
);

/** Home page guest notes: a stack of postcards over a faint, heavily veiled photograph. */
export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="Guest notes"
      className="dark-surface section-space relative isolate overflow-hidden bg-slate text-pearl"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Photo image={backdrop} fill sizes="100vw" />
        <div className="absolute inset-0 bg-slate/90" />
      </div>

      <div className="page-container">
        <p className="label-mono text-champagne">Guest Notes</p>
        <RevealText
          as="h2"
          onDark
          lines={[{ text: "Postcards from our guests" }]}
          className="mt-4 text-h3"
        />

        <div className="mt-6 sm:mt-8">
          <PostcardStage notes={testimonials} />
        </div>

        <Link
          href="/testimonials"
          className="label-mono group mt-8 inline-flex items-center gap-2 text-champagne transition-colors hover:text-champagne-soft"
        >
          Read all guest notes
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
