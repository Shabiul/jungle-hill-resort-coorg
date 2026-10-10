import { MapPin } from "lucide-react";
import { ResortPlan } from "@/components/sections/ResortPlan";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/config/site.config";
import { gettingHere } from "@/data/resortPlan";
import { mapsHref } from "@/lib/contact";

/** Plan, "Getting here" strip, address and the narrow-road note. Used on the home page and /plan-your-stay. */
export function ResortPlanSection({
  id = "plan",
  heading = true,
}: {
  id?: string;
  heading?: boolean;
}) {
  return (
    <section
      id={id}
      aria-label="Resort plan"
      className="dark-surface section-space scroll-mt-20 bg-ink text-ivory"
    >
      <div className="page-container">
        {heading && (
          <SectionHeader
            tone="light"
            label="04 — The resort plan"
            lines={[
              { text: "Find your way" },
              { text: "around the ", emphasis: "estate." },
            ]}
            description={<p>Tap a number to see what is there.</p>}
          />
        )}
        <ResortPlan className={heading ? "mt-8" : undefined} />

        <ol
          aria-label="Getting here"
          className="mt-8 grid gap-4 border-t border-brass/30 pt-6 sm:grid-cols-4"
        >
          {gettingHere.map((step, index) => (
            <li key={step.label}>
              <span className="label-mono text-brass-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 font-display text-h4">{step.label}</p>
              <p className="text-small text-ivory/75">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <address className="text-ivory/90 not-italic">
              {siteConfig.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-2 max-w-[56ch] text-small text-ivory/75">
              The access road is narrow for two vehicles to pass, so please drive slowly.
            </p>
          </div>
          <a
            href={mapsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary gap-2 self-start"
          >
            <MapPin size={16} strokeWidth={1.5} aria-hidden="true" /> Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
