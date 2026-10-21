import type { ReactNode } from "react";

interface PageNoteProps {
  children: ReactNode;
}

/** A short indexable paragraph that links the key pages together. Server-rendered. */
export function PageNote({ children }: PageNoteProps) {
  return (
    <section aria-label="Related pages" className="pb-[var(--space-section)]">
      <div className="page-container">
        <p className="max-w-[62ch] text-body [&_a]:text-body [&_a]:underline [&_a]:decoration-burgundy [&_a]:underline-offset-4 [&_a:hover]:decoration-burgundy">
          {children}
        </p>
      </div>
    </section>
  );
}

