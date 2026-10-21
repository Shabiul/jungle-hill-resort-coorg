import Link from "next/link";
import { RevealText } from "@/components/animations/RevealText";
import { FadeUp } from "@/components/animations/FadeUp";
import { Photo } from "@/components/shared/Photo";
import { destinations } from "@/data/destinations";
import { compact } from "@/lib/images";

const PICKS = ["abbey-falls", "rajas-seat", "madikeri-fort", "dubare-elephant-camp"];

/** Olive band (one of two accent-filled bands) with four real destination photos. */
export function ExploreBand() {
  const places = compact(PICKS.map((id) => destinations.find((d) => d.id === id)));

  return (
    <section
      id="explore"
      aria-label="Explore Madikeri"
      className="section-space bg-olive text-ivory"
    >
      <div className="page-container grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="label-mono text-ivory">Explore Madikeri</p>
          <RevealText
            as="h2"
            onDark
            lines={[
              { text: "Nature, culture and" },
              { text: "untouched ", emphasis: "beauty." },
            ]}
            className="mt-4 text-h2"
          />
          <p className="mt-4 max-w-[44ch] text-ivory">
            Waterfalls, a fort, a viewpoint and an elephant camp, all within reach of the
            resort.
          </p>
          <Link
            href="/tourist-destinations"
            className="btn mt-6 inline-flex !border-ivory !bg-ivory !text-ink"
          >
            Plan Your Visit
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
          {places.map((place, index) => (
            <li key={place.id}>
              <FadeUp index={index}>
                <Link
                  href={`/tourist-destinations#${place.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[6px] border border-ivory/60"
                >
                  <Photo
                    image={place.image}
                    fill
                    sizes="(min-width: 1024px) 15vw, 45vw"
                    objectPosition={place.image?.objectPosition}
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 pt-8 font-display text-lg leading-tight text-ivory">
                    {place.name}
                  </span>
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
