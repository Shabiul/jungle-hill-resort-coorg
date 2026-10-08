import type { ReactNode } from "react";
import { RevealText, type HeadingLine } from "@/components/animations/RevealText";

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
    <section aria-label="Page heading" className="pt-36 pb-12 sm:pt-44 sm:pb-16">
      <div className="page-container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label-mono text-emerald">{label}</p>
          <RevealText
            as="h1"
            immediate
            lines={lines}
            className="mt-5 text-[clamp(3rem,9vw,8rem)] leading-[0.92]"
          />
          {description && (
            <div className="mt-8 max-w-xl text-lg text-stone">{description}</div>
          )}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
      <div className="page-container mt-12">
        <div className="hairline border-t" />
      </div>
    </section>
  );
}
