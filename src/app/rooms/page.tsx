import { CTA } from "@/components/sections/CTA";
import { StayCards } from "@/components/sections/StayCards";
import { PageHero } from "@/components/shared/PageHero";
import { checkTimes } from "@/data/policies";
import { rooms } from "@/data/rooms";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { PageNote } from "@/components/shared/PageNote";
import Link from "next/link";
import { LightAmbient } from "@/components/animations/LightAmbient";

export const metadata = buildMetadata({
  title: "Stays: rooms and cottages",
  description:
    "Stay at Jungle Hill Resort, Coorg: 13 rooms in four categories, from Standard Non-AC rooms to Deluxe AC and Family AC rooms. Rates are given on enquiry.",
  path: "/rooms",
});

export default function RoomsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Stays", path: "/rooms" }])} />
      <PageHero
        label="02 — Stays"
        lines={[{ text: "Four ways" }, { text: "to ", emphasis: "stay." }]}
        description={
          <p>
            13 rooms across four categories. No prices are published, so rates are given
            on enquiry, for your dates.
          </p>
        }
        aside={
          <p className="label-mono text-body">
            13 rooms · 4 stays
            <br />
            Check-in {checkTimes.checkIn} · Check-out {checkTimes.checkOut}
          </p>
        }
      />

      <section aria-label="All stays" className="pb-[var(--space-section)]">
        <div className="page-container">
          <StayCards rooms={rooms} variant="page" />
        </div>
      </section>

      <section
        aria-label="Good to know"
        className="section-space relative isolate overflow-hidden bg-surface theme-sage"
      >
        <LightAmbient />
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-mono text-body">Good to know</p>
            <h2 className="mt-4 text-h3">Before you choose</h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <li>
              <h3 className="text-2xl">Who sleeps where</h3>
              <p className="mt-2 text-body">
                Standard Non-AC rooms and cottages take two adults and an infant only. The
                Deluxe AC Room suits couples or small families, and the Family AC Room
                sleeps up to four.
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Extra mattress</h3>
              <p className="mt-2 text-body">
                In the Deluxe and Family rooms an extra mattress can be arranged on
                request for one additional guest.
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Arrival and departure</h3>
              <p className="mt-2 text-body">
                Check-in is at {checkTimes.checkIn} and check-out at {checkTimes.checkOut}
                . {checkTimes.note}
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Rates</h3>
              <p className="mt-2 text-body">
                Enquire for rates. Tell us your dates and who is travelling and we will
                reply with what is available.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <PageNote>
        The four room types at Jungle Hill Resort sit inside a coffee and pepper estate, 5
        km from Madikeri on the way to Virajpet. Meals are served in the{" "}
        <Link href="/dining">restaurant</Link>, the pool and play area are described under{" "}
        <Link href="/experiences">experiences</Link>, and{" "}
        <Link href="/plan-your-stay">plan your stay</Link> has directions from Madikeri
        and check-in times.
      </PageNote>
      <CTA />
    </>
  );
}
