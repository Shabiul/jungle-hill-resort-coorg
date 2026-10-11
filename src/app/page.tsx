import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { ResortPlanSection } from "@/components/sections/ResortPlanSection";
import { Retreat } from "@/components/sections/Retreat";
import { StaysSection } from "@/components/sections/StaysSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/shared/JsonLd";
import { resortJsonLd } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = {
  ...buildMetadata({
    description:
      "Jungle Hill Resort is a nature retreat in the coffee and pepper plantations of Coorg, 5 km from Madikeri. 13 rooms, a pool, a kids play area and a restaurant.",
    path: "/",
  }),
  // The layout's title template does not apply to the page in the same segment.
  title: { absolute: "Jungle Hill Resort, Coorg | Inspiring Cloudline" },
};

/** Seven parts at most: preloader (layout), hero, retreat, stays, plan, guest notes, closing call to action. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={resortJsonLd()} />
      <Hero />
      <Retreat />
      <StaysSection />
      <ResortPlanSection />
      <Testimonials />
      <CTA />
    </>
  );
}
