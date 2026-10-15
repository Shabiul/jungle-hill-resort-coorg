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

function DestinationCard({ destination }: { destination: Destination }) {
  const { image } = destination;
  const [expanded, setExpanded] = useState(false);
  const textId = useId();

  return (
    <article className="group dark-surface flex h-full flex-col rounded-none border border-steel bg-slate text-pearl transition-colors hover:border-champagne">
      {image && (
        <div className="relative aspect-square w-full overflow-hidden bg-night">
          <Photo
            image={image}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
            objectPosition={image.objectPosition}
            imgClassName="transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="label-mono text-champagne-soft">{destination.distanceKm} km</p>
        <h3 className="mt-2 text-h4">{destination.name}</h3>
        <p id={textId} className={cn("mt-2 text-pearl/85", !expanded && "line-clamp-3")}>
          {destination.description}
        </p>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded((value) => !value)}
          className="label-mono touch-target mt-1 inline-flex items-center self-start text-[0.68rem] text-pearl/70 hover:text-pearl"
        >
          {expanded ? "Show less" : "Read more"}
          <span className="sr-only"> about {destination.name}</span>
        </button>
        <ul
          className="mt-3 flex flex-wrap gap-2"
          aria-label={`Facts about ${destination.name}`}
        >
          {destination.facts.map((fact) => (
            <li
              key={fact}
              className="label-mono border border-steel px-2 py-1 text-[0.62rem] text-pearl/80"
            >
              {fact}
            </li>
          ))}
        </ul>
        <a
          href={mapsSearchUrl(destination.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${destination.name} in Maps`}
          className="label-mono link-underline touch-target mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-champagne-soft"
        >
          Open in Maps <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
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
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
