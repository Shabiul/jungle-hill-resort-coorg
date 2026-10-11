import { GuestNotes } from "@/components/sections/GuestNotes";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Guest notes",
  description:
    "Read 14 guest reviews of Jungle Hill Resort, Coorg, taken from Google and shown as written, including the four-star ones, with no edits to the words.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <section
      aria-label="Guest notes"
      className="dark-surface bg-slate pt-28 pb-[var(--space-section)] text-pearl sm:pt-32"
    >
      <JsonLd data={breadcrumbJsonLd([{ name: "Guest notes", path: "/testimonials" }])} />
      <div className="page-container">
        <GuestNotes reviews={testimonials} />
      </div>
    </section>
  );
}
