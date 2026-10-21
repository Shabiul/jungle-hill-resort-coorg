import type { ReactNode } from "react";
import { RevealText, type HeadingLine } from "@/components/animations/RevealText";
import { AccentMark } from "@/components/animations/AccentMark";
import { LightAmbient } from "@/components/animations/LightAmbient";

interface PageHeroProps {
  /** e.g. "02 — Stays" */
  label: string;
  lines: HeadingLine[];
  description?: ReactNode;
  /** Optional right-hand column (facts, links). */
  aside?: ReactNode;
}

/** Heading block for inner pages. Clears the fixed header and carries the page h1. */
export function PageHero({ label, lines, description, aside }: PageHeroProps) {
  return (
    <section
      aria-label="Page heading"
      className="relative isolate overflow-hidden pt-28 pb-6 sm:pt-32 sm:pb-8"
    >
      <LightAmbient />
      <div className="page-container grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label-mono text-body">{label}</p>
          <AccentMark className="mt-2" />
          <RevealText as="h1" immediate lines={lines} className="mt-4 text-h1" />
          {description && (
            <div className="mt-5 max-w-xl text-lg text-body">{description}</div>
          )}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
      <div className="page-container mt-6">
        <AccentMark tone="hairline" />
      </div>
    </section>
  );
}
