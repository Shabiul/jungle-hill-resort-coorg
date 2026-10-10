import Link from "next/link";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/shared/PageHero";
import { rooms } from "@/data/rooms";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Packages and offers",
  description:
    "Rates and any current offers at Jungle Hill Resort are given on enquiry. Tell us your dates and we will reply.",
  path: "/packages-offers",
});

export default function PackagesOffersPage() {
  return (
    <>
      <PageHero
        label="06 — Packages and offers"
        lines={[{ text: "Rates," }, { text: "on ", emphasis: "request." }]}
        description={
          <p>
            We do not publish fixed packages or prices. Rates depend on the room and your
            dates, and any current offers are shared when you enquire.
          </p>
        }
      />
      {/* TODO: list real packages and offers here once the resort supplies them */}
      <section aria-label="How rates work" className="pb-12">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <ol className="border-t border-ink lg:col-span-6">
            {[
              "Choose a stay: Standard Non-AC Room, Standard Non-AC Cottage, Deluxe AC Room or Family AC Room.",
              "Send your dates and who is travelling, by the enquiry form, WhatsApp or phone.",
              "We reply with availability, rates and any offer that applies.",
            ].map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-ink/20 py-5"
              >
                <span className="label-mono pt-1 text-brass-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <ul className="lg:col-span-5 lg:col-start-8">
            {rooms.map((room) => (
              <li key={room.slug} className="border-t border-ink/25 py-4 last:border-b">
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group flex items-baseline justify-between gap-4"
                >
                  <span className="font-display text-2xl group-hover:underline">
                    {room.name}
                  </span>
                  <span className="label-mono text-stone">{room.rateNote}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
