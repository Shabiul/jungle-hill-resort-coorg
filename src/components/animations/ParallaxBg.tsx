"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves its child up to 24px (12 each way) as the section crosses the screen. Desktop only,
 * transform only, and it listens to scroll only while the section is on screen.
 */
export function ParallaxBg({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (
      !window.matchMedia("(min-width: 1024px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = host.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)),
      );
      el.style.transform = `translate3d(0, ${((progress - 0.5) * 24).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else window.removeEventListener("scroll", onScroll);
    });
    io.observe(host);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={box} className={className}>
      {children}
    </div>
  );
}
