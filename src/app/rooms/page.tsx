import { CTA } from "@/components/sections/CTA";
import { StayCards } from "@/components/sections/StayCards";
import { PageHero } from "@/components/shared/PageHero";
import { checkTimes } from "@/data/policies";
import { rooms } from "@/data/rooms";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Stays: rooms and cottages",
  description:
    "13 rooms in four categories: Standard Non-AC Room, Standard Non-AC Cottage, Deluxe AC Room and Family AC Room. Rates on enquiry.",
  path: "/rooms",
});

export default function RoomsPage() {
  return (
    <>
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
          <p className="label-mono text-stone">
            13 rooms · 4 stays
            <br />
            Check-in {checkTimes.checkIn} · Check-out {checkTimes.checkOut}
          </p>
        }
      />

      <section aria-label="All stays" className="pb-12">
        <div className="page-container">
          <StayCards rooms={rooms} />
        </div>
      </section>

      <section aria-label="Good to know" className="section-space bg-linen">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-mono text-emerald">Good to know</p>
            <h2 className="mt-4 text-h3">Before you choose</h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <li>
              <h3 className="text-2xl">Who sleeps where</h3>
              <p className="mt-2 text-stone">
                Standard Non-AC rooms and cottages take two adults and an infant only. The
                Deluxe AC Room suits couples or small families, and the Family AC Room
                sleeps up to four.
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Extra mattress</h3>
              <p className="mt-2 text-stone">
                In the Deluxe and Family rooms an extra mattress can be arranged on
                request for one additional guest.
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Arrival and departure</h3>
              <p className="mt-2 text-stone">
                Check-in is at {checkTimes.checkIn} and check-out at {checkTimes.checkOut}
                . {checkTimes.note}
              </p>
            </li>
            <li>
              <h3 className="text-2xl">Rates</h3>
              <p className="mt-2 text-stone">
                Enquire for rates. Tell us your dates and who is travelling and we will
                reply with what is available.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
