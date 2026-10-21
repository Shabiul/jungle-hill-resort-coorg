"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/** Nudges its child toward the pointer by at most 6px. Mouse only; does nothing on touch. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 12;
    const dy = ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 12;
    const x = Math.max(-6, Math.min(6, dx));
    const y = Math.max(-6, Math.min(6, dy));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  function leave() {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`inline-block transition-transform duration-200 ease-out motion-reduce:transition-none ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
