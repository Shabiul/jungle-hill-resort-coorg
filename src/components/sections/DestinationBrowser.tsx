"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/shared/Photo";
import {
  bandOf,
  distanceFilters,
  mapsSearchUrl,
  type Destination,
  type DistanceFilter,
} from "@/data/destinations";
import { cn } from "@/lib/utils";

const GROUP_TITLES = {
  nearby: "Nearby, up to 11 km",
  "day-trips": "Day trips, 26 to 44 km",
  far: "Further out, 72 to 80 km",
} as const;

/** Square card: the photo fills the whole card, with the text over a slate scrim at the bottom. */
function DestinationCard({ destination }: { destination: Destination }) {
  const { image } = destination;
  const [expanded, setExpanded] = useState(false);
  const textId = useId();

  return (
    <article className="group dark-surface relative isolate aspect-square overflow-hidden rounded-none border border-steel bg-slate text-pearl transition-colors hover:border-champagne">
      {image && (
        <Photo
          image={image}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          objectPosition={image.objectPosition}
          imgClassName="transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
        />
      )}
      <div
        data-lenis-prevent
        className={cn(
          "absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-5",
          image
            ? expanded
              ? "overflow-y-auto bg-night/90"
              : "bg-gradient-to-t from-night/95 via-night/55 to-transparent to-65%"
            : "overflow-y-auto",
        )}
      >
        <p className="label-mono text-champagne-soft">{destination.distanceKm} km</p>
        <h3 className="mt-1 font-display text-2xl leading-tight">{destination.name}</h3>
        <p
          id={textId}
          className={cn("mt-2 text-small text-pearl/90", !expanded && "line-clamp-2")}
        >
          {destination.description}
        </p>
        {expanded && (
          <ul
            className="mt-3 flex flex-wrap gap-1.5"
            aria-label={`Facts about ${destination.name}`}
          >
            {destination.facts.map((fact) => (
              <li
                key={fact}
                className="label-mono border border-steel px-2 py-1 text-[0.6rem] text-pearl/85"
              >
                {fact}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={textId}
            onClick={() => setExpanded((value) => !value)}
            className="label-mono touch-target text-[0.68rem] text-pearl/80 hover:text-pearl"
          >
            {expanded ? "Show less" : "Read more"}
            <span className="sr-only"> about {destination.name}</span>
          </button>
          <a
            href={mapsSearchUrl(destination.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${destination.name} in Maps`}
            className="label-mono link-underline touch-target inline-flex items-center gap-1 text-[0.68rem] text-champagne-soft"
          >
            Open in Maps <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Distance filter in plain tracked text, then the places grouped by distance. */
export function DestinationBrowser({ destinations }: { destinations: Destination[] }) {
  const [active, setActive] = useState<DistanceFilter["id"]>("all");
  const visible = destinations.filter(
    (place) => active === "all" || bandOf(place.distanceKm) === active,
  );
  const bands = (["nearby", "day-trips", "far"] as const).filter((band) =>
    visible.some((place) => bandOf(place.distanceKm) === band),
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by distance"
        className="flex flex-wrap gap-x-6 gap-y-1"
      >
        {distanceFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
            className={cn(
              "label-mono min-h-11 transition-colors",
              active === filter.id
                ? "text-night underline decoration-champagne underline-offset-8"
                : "text-steel hover:text-night",
            )}
          >
            {filter.label}
          </button>
        ))}
        <p className="label-mono ml-auto self-center text-steel" aria-live="polite">
          {visible.length} places
        </p>
      </div>

      {bands.map((band) => (
        <section key={band} aria-label={GROUP_TITLES[band]} className="mt-8">
          <h2 className="label-mono text-steel">{GROUP_TITLES[band]}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visible
              .filter((place) => bandOf(place.distanceKm) === band)
              .map((place) => (
                <li key={place.id} className="min-w-0">
                  <DestinationCard destination={place} />
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
