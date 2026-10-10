import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { ResortPlanSection } from "@/components/sections/ResortPlanSection";
import { Retreat } from "@/components/sections/Retreat";
import { StaysSection } from "@/components/sections/StaysSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Inspiring Cloudline",
  path: "/",
});

/** Seven parts at most: preloader (layout), hero, retreat, stays, plan, guest notes, closing call to action. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Retreat />
      <StaysSection />
      <ResortPlanSection />
      <Testimonials />
      <CTA />
    </>
  );
}
