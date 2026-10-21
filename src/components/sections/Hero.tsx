import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { HeroFade } from "@/components/animations/HeroFade";
import { HeroMedia } from "@/components/animations/HeroMedia";
import { RevealText } from "@/components/animations/RevealText";
import { HeroEnquiryBar } from "@/components/forms/HeroEnquiryBar";
import { resolveHeroSlides } from "@/data/hero";
import { whatsappLink } from "@/lib/contact";
import { FloatingParticles } from "@/components/animations/FloatingParticles";
import { Magnetic } from "@/components/animations/Magnetic";

export function Hero() {
  return (
    <section
      aria-label="Welcome"
      className="dark-surface relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night-teal text-mist"
    >
      <HeroMedia slides={resolveHeroSlides()} />
      <FloatingParticles />
      {/* Plain vertical scrim for legibility: no colour, no blobs */}
      <div aria-hidden="true" className="absolute inset-0 bg-teal-deep/15" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-teal-deep/45 via-teal-deep/20 to-transparent"
      />

      {/* Faint fog haze near the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-mist/20 to-transparent"
      />

      {/* Soft top scrim so the navigation stays legible over bright photos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-teal-deep/25 to-transparent"
      />

      {/* Optional side label, wide screens only */}
      <p
        aria-hidden="true"
        className="hero-side-label label-mono absolute top-1/2 right-6 origin-center -translate-y-1/2 text-mist/80 [writing-mode:vertical-rl]"
      >
        Est. in the coffee estate · Madikeri
      </p>

      <div className="page-container relative flex flex-1 flex-col justify-end pt-28 pb-44 min-[1400px]:pb-8">
        <HeroFade>
          <p className="label-mono text-mist [text-shadow:0_1px_14px_rgba(15,31,34,0.9)]">
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
          <p className="mt-8 max-w-lg text-lg text-mist [text-shadow:0_1px_14px_rgba(15,31,34,0.8)]">
            Thirteen rooms in a coffee and pepper estate, five kilometres from Madikeri.
          </p>
        </HeroFade>

        <HeroFade delay={0.45} className="mt-8">
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
              >
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                Enquire on WhatsApp
              </a>
            </Magnetic>
            <Link href="/rooms" className="btn btn-outline">
              Explore stays
            </Link>
          </div>
        </HeroFade>

        <HeroFade delay={0.6} className="mt-6 max-w-5xl">
          <HeroEnquiryBar />
        </HeroFade>
      </div>
    </section>
  );
}
