import { GuestNotes } from "@/components/sections/GuestNotes";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Guest notes",
  description:
    "What guests say about Jungle Hill Resort, Coorg: 14 real reviews from Google, including the 4-star ones.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <section
      aria-label="Guest notes"
      className="dark-surface bg-slate pt-28 pb-[var(--space-section)] text-pearl sm:pt-32"
    >
      <div className="page-container">
        <GuestNotes reviews={testimonials} />
      </div>
    </section>
  );
}
