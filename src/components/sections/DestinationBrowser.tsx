"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/shared/Photo";
import { BoxCard } from "@/components/ui/BoxCard";
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
  return (
    <BoxCard className="flex h-full flex-col p-5 sm:p-6">
      {image && (
        <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-night">
          <Photo
            image={image}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          />
        </div>
      )}
      <p className="label-mono text-champagne-soft">{destination.distanceKm} km</p>
      <h3 className="mt-2 text-h3">{destination.name}</h3>
      <p className="mt-3 max-w-[48ch] text-pearl/85">{destination.description}</p>
      <ul
        className="mt-4 flex flex-wrap gap-2"
        aria-label={`Facts about ${destination.name}`}
      >
        {destination.facts.map((fact) => (
          <li
            key={fact}
            className="label-mono border border-champagne/25 px-2.5 py-1 text-[0.62rem] text-pearl/80"
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
        className="label-mono link-underline touch-target mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-champagne-soft"
      >
        Open in Maps <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </BoxCard>
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
        <section key={band} aria-label={GROUP_TITLES[band]} className="mt-10">
          <h2 className="label-mono text-steel">{GROUP_TITLES[band]}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
