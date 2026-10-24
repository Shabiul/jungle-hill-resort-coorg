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
    name: "Games",
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

/** Photo on the left, a short note in the middle and four rows on the right, as in the reference. */
export function HomeExperiences() {
  return (
    <section
      id="experiences"
      aria-label="Experiences"
      className="section-space theme-sand bg-surface text-body"
    >
      <div className="page-container grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <RevealImage
            parallax
            className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-card"
          >
            <Photo
              image={poolPhoto}
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
              imgClassName="transition-transform duration-500 hover:scale-[1.03]"
            />
          </RevealImage>
        </div>

        <div className="lg:col-span-4">
          <SectionHeader
            tone="dark"
            lines={[{ text: "Pool, play" }, { text: "and food" }]}
          />
          <p className="mt-4 max-w-[46ch]">
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
        </div>

        <ul className="grid gap-3 lg:col-span-3">
          {rows.map((row) => (
            <li key={row.name}>
              <Link
                href="/experiences"
                className="group shadow-soft flex items-center gap-3 rounded-[6px] border border-line bg-card p-2"
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
                  className="text-burgundy transition-transform group-hover:translate-x-[3px]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
