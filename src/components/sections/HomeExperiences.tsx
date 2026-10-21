import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealImage } from "@/components/animations/RevealImage";
import { Photo } from "@/components/shared/Photo";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { photo } from "@/lib/images";

const poolPhoto = photo(
  "/images/gallery/pool-with-kids-pool.jpg",
  "Swimming pool and shallow kids pool on a tiled deck with chairs",
);

// Four real things to do. No services the resort did not list.
const rows = [
  {
    name: "Swimming Pool",
    image: photo(
      "/images/gallery/pool-palms.jpg",
      "Blue swimming pool with palms behind",
    ),
  },
  {
    name: "Kids Park",
    image: photo(
      "/images/gallery/kids-park-sign-play.jpg",
      "Kids Park sign with climbing frame and slide",
    ),
  },
  {
    name: "Indoor and Outdoor Games",
    image: photo(
      "/images/gallery/games-table-tennis.jpg",
      "Table-tennis table under a roof among trees",
    ),
  },
  {
    name: "Restaurant",
    image: photo(
      "/images/gallery/dining-restaurant-entrance.jpg",
      "Restaurant entrance framed by coffee plants",
    ),
  },
];

/** The pool photo in the one arch frame, with a short note and four rows. */
export function HomeExperiences() {
  return (
    <section
      id="experiences"
      aria-label="Experiences"
      className="section-space theme-sand bg-surface text-body"
    >
      <div className="page-container grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0">
          <RevealImage className="arch-frame relative aspect-[4/5] overflow-hidden bg-card">
            <Photo
              image={poolPhoto}
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              imgClassName="transition-transform duration-500 hover:scale-[1.03]"
            />
          </RevealImage>
        </div>

        <div className="lg:col-span-7">
          <SectionHeader
            tone="dark"
            label="Experiences"
            lines={[{ text: "Slow days," }, { text: "easy ", emphasis: "evenings." }]}
          />
          <p className="mt-4 max-w-[54ch] text-body-lg">
            A swimming pool with a shallow kids pool, a play area for children under 10,
            indoor games, outdoor shuttle badminton, and a restaurant serving South
            Indian, North Indian and Chinese food.
          </p>
          <Link
            href="/experiences"
            className="link-underline mt-4 inline-flex items-center gap-2 font-medium text-burgundy"
          >
            Explore Experiences{" "}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {rows.map((row) => (
              <li key={row.name}>
                <Link
                  href="/experiences"
                  className="group shadow-soft flex items-center gap-3 rounded-[6px] border border-line bg-card p-2.5"
                >
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-[6px]">
                    <Photo image={row.image} fill sizes="48px" />
                  </span>
                  <span className="flex-1 font-display text-lg leading-tight">
                    {row.name}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-burgundy transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
