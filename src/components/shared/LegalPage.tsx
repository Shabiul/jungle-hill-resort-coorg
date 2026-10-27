import type { ReactNode } from "react";
import { PageHero } from "@/components/shared/PageHero";
import type { HeadingLine } from "@/components/animations/RevealText";

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  label: string;
  lines: HeadingLine[];
  /** Shown under the heading, for example "Last updated 27 October 2026". */
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}

/** Shared layout for the policy pages: heading, contents list, numbered sections. Server-rendered. */
export function LegalPage({ label, lines, updated, intro, sections }: LegalPageProps) {
  return (
    <>
      <PageHero
        label={label}
        lines={lines}
        description={<p>{intro}</p>}
        aside={<p className="label-mono text-body">{updated}</p>}
      />
      <section aria-label="Policy text" className="pb-[var(--space-section)]">
        <div className="page-container grid gap-10 lg:grid-cols-12">
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start"
          >
            <p className="label-mono text-body">On this page</p>
            <ol className="mt-3 space-y-1.5 text-small">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {index + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-[68ch] space-y-9 lg:col-span-8 lg:col-start-5">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-h4">
                  {index + 1}. {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-body [&_a]:underline [&_a]:decoration-burgundy [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
