"use client";

import { useState } from "react";
import Link from "next/link";
import { Lightbox } from "@/components/shared/LazyLightbox";
import { Photo } from "@/components/shared/Photo";
import { BoxCard } from "@/components/ui/BoxCard";
import { roomLabel } from "@/data/rooms";
import { cn } from "@/lib/utils";
import type { Room } from "@/types";

function StayCard({ room }: { room: Room }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = room.images.length;
  const thumbs = room.images.slice(0, 4);
  const hidden = total - 3;

  return (
    <BoxCard className="flex h-full flex-col p-3 sm:p-4">
      <button
        type="button"
        onClick={() => setLightbox(active)}
        aria-label={`Open photo full size: ${room.images[active]?.alt ?? room.name}`}
        className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
      >
        <Photo
          key={room.images[active]?.src}
          image={room.images[active]}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          imgClassName="animate-[fade-in_0.35s_ease-out]"
        />
      </button>

      {thumbs.length > 1 && (
        <ul className="mt-2 grid grid-cols-4 gap-2" aria-label={`${room.name} photos`}>
          {thumbs.map((image, index) => {
            const isMore = index === 3 && total > 4;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => (isMore ? setLightbox(3) : setActive(index))}
                  aria-label={
                    isMore
                      ? `+${hidden}: show all ${total} photos`
                      : `Show photo ${index + 1}: ${image.alt}`
                  }
                  aria-current={!isMore && index === active ? "true" : undefined}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden border transition-opacity",
                    !isMore && index === active
                      ? "border-champagne"
                      : "border-champagne/20 opacity-75 hover:opacity-100",
                  )}
                >
                  <Photo image={image} fill sizes="12vw" />
                  {isMore && (
                    <span className="label-mono absolute inset-0 grid place-items-center bg-night/70 text-pearl">
                      +{hidden}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-1 flex-col pt-5">
        <p className="label-mono text-champagne-soft">
          {roomLabel(room)}
        </p>
        <h3 className="mt-2 text-h3">{room.name}</h3>
        <p className="mt-2 max-w-[44ch] text-pearl/80">{room.summary}</p>

        <ul className="label-mono mt-4 grid grid-cols-3 divide-x divide-champagne/25 border-y border-champagne/25 text-[0.66rem] text-pearl/80">
          {room.highlights.map((fact) => (
            <li key={fact} className="px-2 py-2.5 first:pl-0">
              {fact}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-5">
          <Link href={`/rooms/${room.slug}`} className="btn btn-outline">
            View stay
          </Link>
          <Link href={`/booking?room=${room.slug}`} className="label-mono link-underline touch-target">
            Enquire
          </Link>
          <span className="label-mono ml-auto text-pearl/60">{room.rateNote}</span>
        </div>
      </div>

      <Lightbox
        images={room.images}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
      />
    </BoxCard>
  );
}

/** The four stays as equal-height boxes: 2x2 on desktop, one column on mobile. */
export function StayCards({ rooms }: { rooms: Room[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {rooms.map((room) => (
        <li key={room.slug}>
          <StayCard room={room} />
        </li>
      ))}
    </ul>
  );
}
