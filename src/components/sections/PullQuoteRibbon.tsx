import { pullQuotes } from "@/data/testimonials";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {pullQuotes.map((quote, index) => (
        <li
          key={`${quote.text}-${index}`}
          className="flex items-center whitespace-nowrap"
        >
          <span className="ribbon-text px-7 font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-none">
            {quote.text}
          </span>
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-champagne" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Slow drifting ribbon of short fragments, each verbatim from a real Google review.
 * Pauses on hover and focus; static (and scrollable) for reduced motion.
 */
export function PullQuoteRibbon() {
  return (
    <div
      role="region"
      aria-label="Phrases from guest reviews"
      tabIndex={0}
      className="ribbon group overflow-hidden border-y border-night/20 py-5 focus-visible:overflow-x-auto"
    >
      <div className="ribbon-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
