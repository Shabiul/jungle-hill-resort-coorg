"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Photo } from "@/components/shared/Photo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Room } from "@/types";

/**
 * Editorial list of the four stays. On desktop a photo follows the cursor over the hovered row;
 * on small screens each row shows its photo inline.
 */
export function StaysList({ rooms }: { rooms: Room[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });

  return (
    <div
      onMouseMove={(event) => {
        x.set(event.clientX + 28);
        y.set(event.clientY - 110);
        if (reduced) {
          sx.jump(event.clientX + 28);
          sy.jump(event.clientY - 110);
        }
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <ol className="border-t border-night">
        {rooms.map((room, index) => (
          <li key={room.slug} className="border-b border-night/25">
            <Link
              href={`/rooms/${room.slug}`}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-5 sm:py-6"
            >
              <span className="col-span-3 font-display text-5xl text-steel sm:col-span-2 sm:text-7xl">
                {room.number}
              </span>
              <span className="col-span-9 font-display text-h2 sm:col-span-10 lg:col-span-6">
                <span className="transition-colors group-hover:text-steel">
                  {room.name}
                </span>
              </span>
              <span className="label-mono col-span-12 flex flex-wrap items-center gap-x-5 gap-y-1 text-steel lg:col-span-4 lg:justify-end">
                <span>{room.category}</span>
                <span>{room.sizeSqFt} sq ft</span>
                <span>{room.bed}</span>
                <span>{room.occupancy}</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-night"
                />
              </span>
              <span className="relative col-span-12 mt-2 block aspect-[16/9] overflow-hidden lg:hidden">
                <Photo image={room.images[0]} fill sizes="100vw" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-52 w-72 overflow-hidden border border-night lg:block"
        animate={{
          opacity: hovered === null ? 0 : 1,
          scale: hovered === null ? 0.94 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        {hovered !== null && (
          <div className="relative h-full w-full">
            <Photo image={rooms[hovered].images[0]} fill sizes="288px" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
