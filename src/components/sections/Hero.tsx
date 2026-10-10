import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { HeroFade } from "@/components/animations/HeroFade";
import { HeroMedia } from "@/components/animations/HeroMedia";
import { RevealText } from "@/components/animations/RevealText";
import { HeroEnquiryBar } from "@/components/forms/HeroEnquiryBar";
import { heroPoster, heroVideoSources } from "@/data/site";
import { whatsappLink } from "@/lib/contact";

export function Hero() {
  return (
    <section
      aria-label="Welcome"
      className="dark-surface relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory"
    >
      <HeroMedia poster={heroPoster} sources={[...heroVideoSources]} />
      {/* Plain vertical scrim for legibility: no colour, no blobs */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/35" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
      />

      {/* Optional side label, wide screens only */}
      <p
        aria-hidden="true"
        className="label-mono absolute top-1/2 right-6 hidden origin-center -translate-y-1/2 text-ivory/70 [writing-mode:vertical-rl] xl:block"
      >
        Est. in the coffee estate · Madikeri
      </p>

      <div className="page-container relative flex flex-1 flex-col justify-end pt-28 pb-6 sm:pb-8">
        <HeroFade>
          <p className="label-mono flex flex-wrap items-center gap-x-4 gap-y-1 text-ivory [text-shadow:0_1px_14px_rgba(6,24,15,0.9)]">
            <span className="h-px w-8 bg-brass-soft" aria-hidden="true" />
            Madikeri, Coorg · 5 km towards Virajpet
          </p>
        </HeroFade>

        <RevealText
          as="h1"
          immediate
          onDark
          delay={0.1}
          lines={[{ text: "Rest above" }, { text: "the ", emphasis: "cloudline." }]}
          className="mt-6 max-w-5xl text-display"
        />

        <HeroFade delay={0.35}>
          <p className="mt-8 max-w-lg text-lg text-ivory [text-shadow:0_1px_14px_rgba(6,24,15,0.8)]">
            Thirteen rooms in a coffee and pepper estate, five kilometres from Madikeri.
          </p>
        </HeroFade>

        <HeroFade delay={0.45} className="mt-8 flex items-end justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2"
            >
              <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
              Enquire on WhatsApp
            </a>
            <Link href="/rooms" className="btn btn-outline">
              Explore stays
            </Link>
          </div>
          <div className="hidden items-end gap-3 lg:flex" aria-hidden="true">
            <span className="label-mono text-ivory/80 [writing-mode:vertical-rl]">
              Scroll
            </span>
            <span className="relative block h-16 w-px overflow-hidden bg-ivory/20">
              <span
                className="absolute inset-0 block bg-brass-soft"
                style={{ animation: "scroll-line 2.4s var(--ease-out-expo) infinite" }}
              />
            </span>
          </div>
        </HeroFade>

        <HeroFade delay={0.6} className="mt-6 max-w-5xl">
          <HeroEnquiryBar />
        </HeroFade>
      </div>
    </section>
  );
}
