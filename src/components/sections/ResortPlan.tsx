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

/** Smooth route through the markers in id order (Catmull-Rom converted to Béziers). */
function routePath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
  }
  return d;
}

const route = routePath(planMarkers);

/** Keeps the tooltip inside the plan: flips to the left of the marker on the right-hand side. */
function tooltipStyle(x: number, y: number): React.CSSProperties {
  const top = Math.min(66, Math.max(2, (y / PLAN_VIEWBOX.height) * 100 - 20));
  return x > 600
    ? {
        right: `${Math.max(2, 100 - (x / PLAN_VIEWBOX.width) * 100 + 3)}%`,
        top: `${top}%`,
      }
    : { left: `${Math.min(70, (x / PLAN_VIEWBOX.width) * 100 + 3)}%`, top: `${top}%` };
}

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
        <div className="relative overflow-hidden rounded-none border border-steel bg-night">
          <svg
            viewBox={`0 0 ${PLAN_VIEWBOX.width} ${PLAN_VIEWBOX.height}`}
            role="group"
            aria-label="Illustrative plan of the resort, not to scale"
            className="block h-auto w-full"
          >
            <defs>
              <pattern id="vines" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.4" fill="#6f8294" fillOpacity="0.55" />
              </pattern>
            </defs>
            <rect width="1000" height="620" fill="#151e27" />
            {plantation.map((d) => (
              <g key={d}>
                <path d={d} fill="#22303c" fillOpacity="0.55" />
                <path d={d} fill="url(#vines)" />
              </g>
            ))}

            {/* Winding access road and paths */}
            <path
              d="M-10 600 C 120 600 220 585 320 560 C 400 540 460 520 500 470"
              fill="none"
              stroke="#a9b8c4"
              strokeOpacity="0.7"
              strokeWidth="2.4"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
            {/* Walking route, in the order of the numbers */}
            <path
              d={route}
              fill="none"
              stroke="#c9b58e"
              strokeOpacity="0.6"
              strokeWidth="1.4"
              strokeDasharray="6 5"
              strokeLinecap="round"
            />

            {planMarkers
              .filter((m) => m.kind === "building")
              .map((m) => ({ x: m.x - 26, y: m.y - 17, w: 52, h: 34 }))
              .map((b) => (
                <rect
                  key={`${b.x}-${b.y}`}
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="2"
                  fill="#f4f2ee"
                  fillOpacity="0.1"
                  stroke="#e1d3b4"
                  strokeOpacity="0.6"
                />
              ))}
            {/* Pool, drawn under its marker */}
            {planMarkers
              .filter((m) => m.kind === "pool")
              .map((m) => (
                <rect
                  key={m.id}
                  x={m.x - 46}
                  y={m.y - 24}
                  width="92"
                  height="48"
                  rx="3"
                  fill="#22303c"
                  stroke="#e1d3b4"
                  strokeOpacity="0.6"
                />
              ))}
            {/* Parking: an unnumbered, decorative shape beside the entrance road */}
            <g aria-hidden="true" opacity="0.8">
              <rect
                x="330"
                y="486"
                width="60"
                height="30"
                rx="2"
                fill="none"
                stroke="#a9b8c4"
                strokeOpacity="0.6"
                strokeDasharray="3 3"
              />
              <text
                x="360"
                y="506"
                textAnchor="middle"
                fontSize="13"
                fill="#a9b8c4"
                fontFamily="var(--font-jost), sans-serif"
              >
                P
              </text>
            </g>

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
                  className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-[#f4f2ee] [&:focus-visible>circle]:stroke-[2.5]"
                >
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={on ? 17 : 14}
                    fill={on ? "#c9b58e" : "#0d1319"}
                    stroke="#c9b58e"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.2s, fill 0.2s" }}
                  />
                  <text
                    x={marker.x}
                    y={marker.y + 4.5}
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="var(--font-jost), sans-serif"
                    fill={on ? "#0d1319" : "#f4f2ee"}
                    style={{ pointerEvents: "none" }}
                  >
                    {marker.id}
                  </text>
                </g>
              );
            })}

            <text
              x="980"
              y="605"
              textAnchor="end"
              fontSize="11"
              letterSpacing="2.2"
              fill="#e1d3b4"
              fillOpacity="0.8"
              fontFamily="var(--font-jost), sans-serif"
            >
              ILLUSTRATIVE PLAN, NOT TO SCALE
            </text>
          </svg>

          {current && (
            <GlassPanel
              role="status"
              className="pointer-events-none absolute z-10 flex w-52 gap-3 bg-night/70 p-2 text-pearl"
              style={tooltipStyle(current.x, current.y)}
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
                <span className="label-mono block text-[0.6rem] text-pearl/80">
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
                "grid min-h-11 w-full grid-cols-[2rem_1fr] items-center gap-2 border-b border-champagne/25 py-2 text-left transition-colors",
                active === marker.id ? "bg-pearl/10" : "hover:bg-pearl/5",
              )}
            >
              <span className="label-mono text-champagne-soft">
                {String(marker.id).padStart(2, "0")}
              </span>
              <span className="text-pearl">{marker.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
