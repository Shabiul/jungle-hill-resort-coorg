import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VideoBackground } from "@/components/animations/VideoBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { homeImages, rainVideoSources } from "@/data/site";

const stats = [
  { value: "13", label: "Rooms" },
  { value: "4", label: "Stay types" },
  { value: "5 km", label: "From Madikeri" },
  { value: "7 AM – 10 PM", label: "Restaurant" },
];

const strip = [
  { label: "Pool", href: "/experiences#swimming-pool" },
  { label: "Kids Park", href: "/experiences#kids-park" },
  { label: "Games", href: "/experiences#indoor-games" },
  { label: "Restaurant", href: "/dining" },
];

/** Short introduction: one paragraph, four real facts and a slim strip to the amenities. */
export function Retreat() {
  return (
    <section
      id="retreat"
      aria-label="The retreat"
      className="section-space mist-top relative isolate overflow-hidden bg-pearl text-night"
    >
      {rainVideoSources.length > 0 && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-15">
          <VideoBackground
            poster={homeImages.welcomeB}
            sources={rainVideoSources}
            sizes="100vw"
          />
        </div>
      )}
      <div className="page-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeader
            className="lg:col-span-7"
            label="01 — The retreat"
            lines={[{ text: "Coffee, pepper" }, { text: "and ", emphasis: "quiet." }]}
          />
          <p className="max-w-[44ch] text-body-lg lg:col-span-5 lg:pb-2">
            Thirteen rooms among coffee and pepper plantations, five kilometres from
            Madikeri. Quiet by design, with a pool, a restaurant and room to breathe.
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-2 border-t border-night/25 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-night/20 py-5 pr-4 odd:border-r odd:border-night/20 lg:border-r lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <dd className="font-display text-h3 leading-none">{stat.value}</dd>
              <dt className="label-mono mt-2 text-steel">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <ul
          aria-label="On the property"
          className="mt-8 grid grid-cols-2 border-y border-night/25 sm:grid-cols-4"
        >
          {strip.map((item) => (
            <li
              key={item.label}
              className="border-night/20 [&:not(:last-child)]:sm:border-r"
            >
              <Link
                href={item.href}
                className="label-mono group flex min-h-14 items-center justify-between gap-3 px-4 first:pl-0 hover:text-steel"
              >
                {item.label}
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
