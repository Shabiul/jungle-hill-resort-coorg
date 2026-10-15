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

/**
 * Clean square card: the photo fills it, with only the distance and the name on a soft fade.
 * Tapping the card opens the details (description, facts, Maps link) over the photo.
 */
function DestinationCard({ destination }: { destination: Destination }) {
  const { image } = destination;
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <article className="group dark-surface relative isolate aspect-square overflow-hidden rounded-[14px] bg-slate text-pearl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] ring-1 ring-night/20 transition-shadow hover:ring-2 hover:ring-champagne">
      {image && (
        <Photo
          image={image}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          objectPosition={image.objectPosition}
          imgClassName="transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
        />
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((value) => !value)}
        className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-night/90 via-night/30 to-transparent to-60% p-5 text-left sm:p-6"
      >
        <span className="label-mono text-champagne-soft">
          {destination.distanceKm} km
        </span>
        <span className="mt-1 block font-display text-2xl leading-tight sm:text-3xl">
          {destination.name}
        </span>
        <span className="sr-only">{open ? "Hide details" : "Show details"}</span>
      </button>

      <div
        id={detailsId}
        data-lenis-prevent
        hidden={!open}
        className="absolute inset-0 z-20 flex flex-col overflow-y-auto bg-night/92 p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-mono text-champagne-soft">{destination.distanceKm} km</p>
            <h3 className="mt-1 font-display text-2xl leading-tight">
              {destination.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="label-mono touch-target shrink-0 text-[0.68rem] text-pearl/80 hover:text-pearl"
          >
            Close<span className="sr-only"> details for {destination.name}</span>
          </button>
        </div>
        <p className="mt-3 text-small text-pearl/90">{destination.description}</p>
        <ul
          className="mt-3 flex flex-wrap gap-1.5"
          aria-label={`Facts about ${destination.name}`}
        >
          {destination.facts.map((fact) => (
            <li
              key={fact}
              className="label-mono rounded-full border border-steel px-2.5 py-1 text-[0.6rem] text-pearl/85"
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
          className="label-mono link-underline touch-target mt-auto inline-flex items-center gap-1 self-start pt-3 text-[0.7rem] text-champagne-soft"
        >
          Open in Maps <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
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
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
