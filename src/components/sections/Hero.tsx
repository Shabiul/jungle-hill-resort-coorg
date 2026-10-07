import { HeroVideo } from "@/components/animations/HeroVideo";
import { RevealText } from "@/components/animations/RevealText";
import { HeroEnquiryBar } from "@/components/forms/HeroEnquiryBar";
import { siteConfig } from "@/config/site.config";
import { heroPoster, heroVideoSources } from "@/data/site";

export function Hero() {
  return (
    <section
      aria-label="Welcome"
      className="relative isolate flex min-h-[100svh] flex-col bg-forest-950 text-paper"
    >
      <HeroVideo poster={heroPoster} sources={[...heroVideoSources]} priority />
      {/* Darkening for text contrast; solid tint, no gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 bg-forest-950/50" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950/70 to-transparent"
      />

      <div className="page-container relative flex flex-1 flex-col justify-end pt-36 pb-10 sm:pb-14">
        <p className="label-mono flex flex-wrap items-center gap-x-4 gap-y-1 text-paper/85">
          <span>{siteConfig.tagline}</span>
          <span aria-hidden="true" className="hidden h-px w-10 bg-paper/50 sm:block" />
          <span>Madikeri, Coorg</span>
        </p>

        <RevealText
          as="h1"
          immediate
          delay={0.15}
          lines={[
            "Rest above",
            <>
              the <em className="font-light italic">cloudline.</em>
            </>,
          ]}
          className="mt-6 max-w-5xl text-[clamp(3.25rem,11vw,9.5rem)] leading-[0.92] text-balance"
        />

        <p className="mt-8 max-w-xl text-lg text-paper/90">
          Thirteen rooms in a coffee and pepper estate, five kilometres from Madikeri on
          the road to Virajpet. A pool, a quiet restaurant and a lot of green.
        </p>

        <div className="mt-10 max-w-5xl">
          <HeroEnquiryBar />
        </div>
      </div>
    </section>
  );
}
