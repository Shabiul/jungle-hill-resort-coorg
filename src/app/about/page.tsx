import Link from "next/link";
import { RevealImage } from "@/components/animations/RevealImage";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/shared/PageHero";
import { Photo } from "@/components/shared/Photo";
import { homeImages } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { PageNote } from "@/components/shared/PageNote";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Jungle Hill Resort is a nature retreat in the coffee and pepper plantations of Coorg, 5 km from Madikeri on the Virajpet road. Read about the estate.",
  path: "/about",
});

const facts = [
  ["5 km", "from Madikeri, on the way to Virajpet"],
  ["13", "rooms in Standard Non-AC, Deluxe AC and Family AC categories"],
  ["7 AM – 10 PM", "restaurant: South Indian, North Indian and Chinese"],
  [
    "Pool · Play · Games",
    "swimming pool, kids play area, indoor games and shuttle badminton",
  ],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageHero
        label="01 — About"
        lines={[{ text: "Coffee, pepper" }, { text: "and ", emphasis: "quiet." }]}
        description={
          <p>
            Jungle Hill Resort is a nature retreat surrounded by lush coffee and pepper
            plantations, just 5 km from Madikeri on the way to Virajpet.
          </p>
        }
      />

      <section aria-label="The resort" className="pb-[var(--space-section)]">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <p>
              There are 13 well-maintained rooms across Standard Non-AC, Deluxe AC and
              Family AC categories. A swimming pool, a kids play area, indoor games
              (carrom, chess, table tennis, foosball) and outdoor shuttle badminton fill
              the day.
            </p>
            <p>
              The in-house restaurant serves South Indian, North Indian and Chinese
              cuisine through the day.
            </p>
            <p>
              It is designed for relaxation and a peaceful stay in nature. Quiet hours
              start at 10:00 PM: no loud music or loud sounds after that.
            </p>
          </div>
          <div className="grid grid-cols-12 items-start gap-4 lg:col-span-7">
            <RevealImage className="col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo
                  image={homeImages.welcomeA}
                  fill
                  sizes="(min-width: 1024px) 28vw, 58vw"
                />
              </div>
            </RevealImage>
            <RevealImage className="col-span-5 mt-10" delay={0.1}>
              <div className="relative aspect-square overflow-hidden">
                <Photo
                  image={homeImages.welcomeB}
                  fill
                  sizes="(min-width: 1024px) 20vw, 42vw"
                />
              </div>
            </RevealImage>
          </div>
        </div>
      </section>

      <section aria-label="At a glance" className="section-space bg-vapour">
        <dl className="page-container grid gap-px bg-night/20 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([value, label]) => (
            <div key={value} className="bg-vapour p-6 first:pl-0 lg:py-2">
              <dt className="font-display text-3xl">{value}</dt>
              <dd className="mt-2 text-sm text-steel">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="The people" className="section-space">
        <div className="page-container grid gap-6 sm:grid-cols-2">
        </div>
        <p className="page-container mt-6">
          <Link href="/rooms" className="label-mono link-underline">
            See the stays
          </Link>
        </p>
      </section>

      <PageNote>
        See the <Link href="/rooms">rooms</Link>, the <Link href="/dining">restaurant</Link> and the <Link href="/experiences">experiences</Link> on the estate, or go straight to <Link href="/plan-your-stay">plan your stay</Link>.
      </PageNote>
      <CTA />
    </>
  );
}
