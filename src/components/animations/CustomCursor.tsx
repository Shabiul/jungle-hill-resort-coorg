"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Small ring that follows the mouse on desktop. Grows over links and buttons. Decorative only. */
export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      const interactive = !!target?.closest?.(
        "a, button, [role=button], summary, label, input, select",
      );
      ring.current?.setAttribute("data-grow", interactive ? "true" : "false");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[95]"
      style={{ x: sx, y: sy }}
    >
      <div
        ref={ring}
        data-grow="false"
        className="-mt-3.5 -ml-3.5 h-7 w-7 rounded-full border border-brass transition-transform duration-300 ease-[var(--ease-out-expo)] data-[grow=true]:scale-[2.2]"
      />
    </motion.div>
  );
}
