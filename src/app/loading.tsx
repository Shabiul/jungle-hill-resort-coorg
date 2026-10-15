/**
 * Page-level fallback. It is deliberately a full-height, empty block: a short "Loading…" line let the
 * footer sit at the top of the screen until the page streamed in, then jump down (a large layout shift).
 */
export default function Loading() {
  return <div role="status" aria-label="Loading" className="min-h-[100svh]" />;
}
