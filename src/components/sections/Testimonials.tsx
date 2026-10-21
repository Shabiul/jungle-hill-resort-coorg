import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import dynamic from "next/dynamic";
import { Photo } from "@/components/shared/Photo";
import { spokenNotes } from "@/data/testimonials";
import { photo } from "@/lib/images";

// Split into its own chunk (still server-rendered) so the first load hydrates less.
const SpokenStage = dynamic(() =>
  import("@/components/sections/SpokenStage").then((m) => m.SpokenStage),
);

const backdrop = photo(
  "/images/gallery/grounds-misty-valley.jpg",
  "Mist over the valley beyond the resort's tiled roofs",
);

/** Home page guest notes: speech bubbles over a faint, heavily veiled photograph. */
export function Testimonials() {
  return (
    <section
      id="reviews"
      aria-label="Guest notes"
      className="section-space relative isolate overflow-hidden bg-surface text-body"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Photo image={backdrop} fill sizes="100vw" />
        <div className="absolute inset-0 bg-ivory/93" />
      </div>

      <div className="page-container">
        <p className="label-mono text-body">Guest Notes</p>
        <RevealText
          as="h2"
          lines={[{ text: "Words from our guests" }]}
          className="mt-4 text-h3"
        />

        <div className="mt-6 sm:mt-8">
          <SpokenStage notes={spokenNotes} />
        </div>

        <Link
          href="/testimonials"
          className="label-mono group mt-8 inline-flex items-center gap-2 text-body transition-colors hover:text-burgundy"
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
