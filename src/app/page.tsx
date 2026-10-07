import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Dining } from "@/components/sections/Dining";
import { Experiences } from "@/components/sections/Experiences";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Glance } from "@/components/sections/Glance";
import { Hero } from "@/components/sections/Hero";
import { HouseRules } from "@/components/sections/HouseRules";
import { Location } from "@/components/sections/Location";
import { RoomsPreview } from "@/components/sections/RoomsPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Inspiring Cloudline",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Glance />
      <About />
      <RoomsPreview />
      <Experiences />
      <Dining />
      <HouseRules />
      <Testimonials />
      <GalleryPreview />
      <Location />
      <CTA />
    </>
  );
}
