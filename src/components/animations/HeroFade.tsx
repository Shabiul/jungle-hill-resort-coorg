import type { CSSProperties, ReactNode } from "react";

interface HeroFadeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fade-up for hero content. Pure CSS (see .hero-fade), so it is in the server HTML and animates
 * on first paint without waiting for scripts. While the preloader plays, <html data-hero="hidden">
 * holds it back and removing that attribute replays the entrance as the curtain clears.
 */
export function HeroFade({ children, delay = 0, className }: HeroFadeProps) {
  return (
    <div
      className={`hero-fade ${className ?? ""}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
