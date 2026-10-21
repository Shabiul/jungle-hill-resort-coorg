"use client";

import { useState } from "react";
import { m } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const current = planMarkers.find((marker) => marker.id === active) ?? null;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <div className="lg:col-span-8">
        <div className="theme-sage relative overflow-hidden rounded-[6px] border border-line bg-surface">
          <svg
            viewBox={`0 0 ${PLAN_VIEWBOX.width} ${PLAN_VIEWBOX.height}`}
            role="group"
            aria-label="Illustrative plan of the resort, not to scale"
            className="block h-auto w-full"
          >
            <defs>
              <pattern id="vines" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.4" fill="#687451" fillOpacity="0.45" />
              </pattern>
            </defs>
            <rect width="1000" height="620" fill="#f7f4ec" />
            {plantation.map((d) => (
              <g key={d}>
                <path d={d} fill="#687451" fillOpacity="0.14" />
                <path d={d} fill="url(#vines)" />
              </g>
            ))}

            {/* Winding access road and paths */}
            <path
              d="M-10 600 C 120 600 220 585 320 560 C 400 540 460 520 500 470"
              fill="none"
              stroke="#687451"
              strokeOpacity="0.7"
              strokeWidth="2.4"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
            {/* Walking route, in the order of the numbers: a mask draws it on first view */}
            <mask
              id="route-reveal"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1000"
              height="620"
            >
              <m.path
                d={route}
                fill="none"
                stroke="white"
                strokeWidth="8"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </mask>
            <path
              mask="url(#route-reveal)"
              d={route}
              fill="none"
              stroke="#687451"
              strokeOpacity="0.95"
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
                  fill="#f7f4ec"
                  fillOpacity="0.95"
                  stroke="#687451"
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
                  fill="#687451"
                  fillOpacity="0.3"
                  stroke="#687451"
                  strokeOpacity="0.8"
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
                stroke="#687451"
                strokeOpacity="0.6"
                strokeDasharray="3 3"
              />
              <text
                x="360"
                y="506"
                textAnchor="middle"
                fontSize="13"
                fill="#641c2b"
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
                  className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-[#641c2b] [&:focus-visible>circle]:stroke-[2.5]"
                >
                  <m.g
                    initial={reduced ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + marker.id * 0.07,
                      ease: "easeOut",
                    }}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  >
                    {on && (
                      <circle
                        className="plan-pulse"
                        cx={marker.x}
                        cy={marker.y}
                        r={14}
                        fill="none"
                        stroke={marker.kind === "pool" ? "#687451" : "#641c2b"}
                        strokeWidth="1.5"
                      />
                    )}
                    <circle
                      cx={marker.x}
                      cy={marker.y}
                      r={on ? 17 : 14}
                      fill={on ? "#687451" : "#641c2b"}
                      stroke={marker.kind === "pool" ? "#687451" : "#641c2b"}
                      strokeWidth="1.5"
                      style={{ transition: "r 0.2s, fill 0.2s" }}
                    />
                    <text
                      x={marker.x}
                      y={marker.y + 4.5}
                      textAnchor="middle"
                      fontSize="13"
                      fontFamily="var(--font-jost), sans-serif"
                      fill="#f7f4ec"
                      style={{ pointerEvents: "none" }}
                    >
                      {marker.id}
                    </text>
                  </m.g>
                </g>
              );
            })}

            <text
              x="980"
              y="605"
              textAnchor="end"
              fontSize="11"
              letterSpacing="2.2"
              fill="#641c2b"
              fillOpacity="0.9"
              fontFamily="var(--font-jost), sans-serif"
            >
              ILLUSTRATIVE PLAN, NOT TO SCALE
            </text>
          </svg>

          {current && (
            <GlassPanel
              role="status"
              className="pointer-events-none absolute z-10 flex w-52 gap-3 bg-card/85 p-2 text-body"
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
                <span className="label-mono block text-[0.6rem] text-body/80">
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
                "grid min-h-11 w-full grid-cols-[2rem_1fr] items-center gap-2 border-b border-line py-2 text-left transition-colors",
                active === marker.id ? "bg-card" : "hover:bg-card/60",
              )}
            >
              <span className="label-mono text-body">
                {String(marker.id).padStart(2, "0")}
              </span>
              <span className="text-body">{marker.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
