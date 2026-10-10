import { Mail, MapPin, Phone } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { ResortPlanSection } from "@/components/sections/ResortPlanSection";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site.config";
import { faqs } from "@/data/faqs";
import { checkTimes } from "@/data/policies";
import { mailLink, mapsHref, telLink } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Plan your stay",
  description:
    "How to reach Jungle Hill Resort, 5 km from Madikeri on the way to Virajpet, plus check-in times, house rules and answers to common questions.",
  path: "/plan-your-stay",
});

const steps = [
  "Head for Madikeri, the main town of Coorg.",
  "From Madikeri take the road towards Virajpet. The resort is about 5 km along it.",
  "The address is Mekeri Village, Madikeri. Open the map link below for the exact pin.",
  "The access road is narrow and two vehicles cannot pass easily. Please drive slowly and give way.",
];

export default function PlanYourStayPage() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.addressOneLine)}&output=embed`;

  return (
    <>
      <PageHero
        label="08 — Plan your stay"
        lines={[{ text: "Getting here," }, { text: "and ", emphasis: "staying." }]}
        description={
          <p>
            Five kilometres from Madikeri on the way to Virajpet, surrounded by coffee and
            pepper plantations.
          </p>
        }
      />

      <ResortPlanSection id="plan" heading={false} />

      <section aria-label="Location and directions" className="pb-12">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="label-mono !font-mono text-xs text-steel">Address</h2>
            <address className="mt-3 font-display text-3xl not-italic">
              {siteConfig.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mapsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
              >
                <MapPin size={16} strokeWidth={1.5} aria-hidden="true" /> Open in Google
                Maps
              </a>
              <a href={telLink} className="btn btn-outline gap-2">
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" />{" "}
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={mailLink} className="btn btn-outline gap-2">
                <Mail size={16} strokeWidth={1.5} aria-hidden="true" /> Email
              </a>
            </div>

            <h2 className="label-mono mt-8 !font-mono text-xs text-steel">
              How to reach
            </h2>
            <ol className="mt-4 border-t border-night">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-night/20 py-4"
                >
                  <span className="label-mono pt-1 text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {/* TODO: nearby Coorg ideas, only once the resort confirms what to recommend */}
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden border border-night/20 bg-vapour">
              <iframe
                title="Map showing Jungle Hill Resort"
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
            <p className="mt-3 text-sm text-steel">
              The map searches for the address. If the pin looks off, use the Google Maps
              button or call us.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Check-in and check-out" className="section-space bg-vapour">
        <div className="page-container grid gap-6 sm:grid-cols-3">
          <div>
            <p className="label-mono text-steel">Check-in</p>
            <p className="mt-2 font-display text-5xl">{checkTimes.checkIn}</p>
          </div>
          <div>
            <p className="label-mono text-steel">Check-out</p>
            <p className="mt-2 font-display text-5xl">{checkTimes.checkOut}</p>
          </div>
          <p className="text-steel">
            {checkTimes.note} ID proof is mandatory, and visitors are not allowed.
          </p>
        </div>
      </section>

      <section aria-label="Frequently asked questions" className="section-space">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label-mono text-steel">Questions</p>
            <h2 className="mt-4 text-h3">
              Things people <em className="font-light text-steel">ask.</em>
            </h2>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group border-t border-night/25 py-5 last:border-b"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="label-mono text-steel transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-steel">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
