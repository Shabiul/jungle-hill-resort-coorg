"use client";

import { useState } from "react";
import { Photo } from "@/components/shared/Photo";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PLAN_VIEWBOX, planMarkers } from "@/data/resortPlan";
import { cn } from "@/lib/utils";

/** Plantation areas: soft green shapes with dotted vine rows. Purely illustrative. */
const plantation = [
  "M30 330 C 90 290 190 330 215 400 C 240 470 160 560 70 540 C 20 520 -10 400 30 330 Z",
  "M640 470 C 720 520 860 520 950 470 L 970 600 L 620 600 Z",
  "M470 40 C 540 20 700 30 740 70 C 700 100 540 110 470 90 Z",
];

const buildings: { x: number; y: number; w: number; h: number }[] = [
  { x: 535, y: 392, w: 52, h: 34 },
  { x: 300, y: 282, w: 60, h: 36 },
  { x: 188, y: 178, w: 52, h: 34 },
  { x: 412, y: 178, w: 56, h: 34 },
  { x: 566, y: 124, w: 58, h: 36 },
  { x: 676, y: 318, w: 58, h: 34 },
];

/**
 * Original illustrative site plan. Markers and the legend are linked: hover, focus or tap either
 * one to highlight the other and see a photo. Marker data lives in src/data/resortPlan.ts.
 */
export function ResortPlan({ className }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const current = planMarkers.find((marker) => marker.id === active) ?? null;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <div className="lg:col-span-8">
        <div className="relative overflow-hidden rounded-[2px] border border-brass/30 bg-ink">
          <svg
            viewBox={`0 0 ${PLAN_VIEWBOX.width} ${PLAN_VIEWBOX.height}`}
            role="group"
            aria-label="Illustrative plan of the resort, not to scale"
            className="block h-auto w-full"
          >
            <defs>
              <pattern id="vines" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.4" fill="#5E7A63" fillOpacity="0.55" />
              </pattern>
            </defs>
            <rect width="1000" height="620" fill="#0C2E21" />
            {plantation.map((d) => (
              <g key={d}>
                <path d={d} fill="#14503A" fillOpacity="0.55" />
                <path d={d} fill="url(#vines)" />
              </g>
            ))}

            {/* Winding access road and paths */}
            <path
              d="M-10 600 C 120 600 200 560 300 540 C 400 520 440 540 500 500 C 560 460 540 440 560 410"
              fill="none"
              stroke="#D9C29A"
              strokeOpacity="0.7"
              strokeWidth="2.4"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
            <g fill="none" stroke="#B8955A" strokeOpacity="0.55" strokeWidth="1">
              <path d="M560 410 C 500 380 440 330 330 300" />
              <path d="M330 300 C 280 260 250 230 215 195" />
              <path d="M330 300 C 380 260 410 230 440 195" />
              <path d="M440 195 C 500 170 550 150 595 140" />
              <path d="M560 410 C 620 380 660 360 705 335" />
              <path d="M705 335 C 740 300 780 250 810 205" />
              <path d="M705 335 C 740 380 770 410 790 440" />
              <path d="M810 205 C 850 240 880 270 905 300" />
              <path d="M560 410 C 500 450 460 490 420 515" />
            </g>

            {buildings.map((b) => (
              <rect
                key={`${b.x}-${b.y}`}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="2"
                fill="#F5F1E8"
                fillOpacity="0.1"
                stroke="#D9C29A"
                strokeOpacity="0.6"
              />
            ))}
            {/* Pool */}
            <rect
              x="770"
              y="170"
              width="84"
              height="44"
              rx="3"
              fill="#14503A"
              stroke="#D9C29A"
              strokeOpacity="0.6"
            />

            {planMarkers.map((marker) => {
              const on = marker.id === active;
              return (
                <g
                  key={marker.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${marker.id}. ${marker.label}`}
                  aria-pressed={on}
                  onMouseEnter={() => setActive(marker.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(marker.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : marker.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(on ? null : marker.id);
                    }
                  }}
                  className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-[#F5F1E8] [&:focus-visible>circle]:stroke-[2.5]"
                >
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={on ? 17 : 14}
                    fill={on ? "#B8955A" : "#06180F"}
                    stroke="#B8955A"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s, fill 0.2s" }}
                  />
                  <text
                    x={marker.x}
                    y={marker.y + 4.5}
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="var(--font-jost), sans-serif"
                    fill={on ? "#06180F" : "#F5F1E8"}
                    style={{ pointerEvents: "none" }}
                  >
                    {marker.id}
                  </text>
                </g>
              );
            })}

            <text
              x="20"
              y="605"
              fontSize="11"
              letterSpacing="2.2"
              fill="#D9C29A"
              fillOpacity="0.8"
              fontFamily="var(--font-jost), sans-serif"
            >
              ILLUSTRATIVE PLAN, NOT TO SCALE
            </text>
          </svg>

          {current && (
            <GlassPanel
              role="status"
              className="pointer-events-none absolute z-10 flex w-52 gap-3 bg-ink/70 p-2 text-ivory"
              style={{
                left: `${Math.min(78, Math.max(2, (current.x / PLAN_VIEWBOX.width) * 100 + 2))}%`,
                top: `${Math.min(70, Math.max(2, (current.y / PLAN_VIEWBOX.height) * 100 - 14))}%`,
              }}
            >
              {current.image && (
                <span className="relative block h-14 w-16 shrink-0 overflow-hidden">
                  <Photo image={current.image} fill sizes="64px" />
                </span>
              )}
              <span>
                <span className="block font-display text-lg leading-tight">
                  {current.label}
                </span>
                <span className="label-mono block text-[0.6rem] text-ivory/80">
                  {current.note}
                </span>
              </span>
            </GlassPanel>
          )}
        </div>
      </div>

      <ol className="lg:col-span-4" aria-label="Plan legend">
        {planMarkers.map((marker) => (
          <li key={marker.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(marker.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(marker.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === marker.id ? null : marker.id)}
              aria-pressed={active === marker.id}
              className={cn(
                "grid min-h-11 w-full grid-cols-[2rem_1fr] items-center gap-2 border-b border-brass/25 py-2 text-left transition-colors",
                active === marker.id ? "bg-ivory/10" : "hover:bg-ivory/5",
              )}
            >
              <span className="label-mono text-brass-soft">
                {String(marker.id).padStart(2, "0")}
              </span>
              <span className="text-ivory">{marker.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
