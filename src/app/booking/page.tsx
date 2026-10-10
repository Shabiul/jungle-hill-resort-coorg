import { Suspense } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site.config";
import { mailLink, telLink } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Enquire about a stay",
  description:
    "Send an enquiry for your dates. There is no online booking yet: we reply with availability and rates, or you can send the same details on WhatsApp.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        label="Enquire"
        lines={[{ text: "Tell us" }, { text: "your ", emphasis: "dates." }]}
        description={
          <p>
            There is no booking engine yet. Send your dates and who is travelling, and we
            reply with availability and rates.
          </p>
        }
      />
      <section aria-label="Enquiry form" className="pb-12">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<p className="text-stone">Loading the form…</p>}>
              <BookingForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="brutal-card p-6">
              <p className="label-mono text-brass-deep">Prefer to talk?</p>
              <a
                href={telLink}
                className="link-underline mt-3 block font-display text-3xl"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <p className="mt-3 text-sm text-stone">
                Also on WhatsApp. Check-in 12 PM, check-out 11 AM.
              </p>
              <p className="mt-3 text-small">
                <a href={mailLink} className="link-underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
