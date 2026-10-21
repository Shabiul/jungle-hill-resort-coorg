import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { VideoBackground } from "@/components/animations/VideoBackground";
import { RevealText } from "@/components/animations/RevealText";
import { estateVideoSources } from "@/data/site";
import { photo } from "@/lib/images";
import { whatsappLink } from "@/lib/contact";
import { FloatingParticles } from "@/components/animations/FloatingParticles";
import { Photo } from "@/components/shared/Photo";

const poster = photo(
  "/images/gallery/grounds-valley-path.jpg",
  "Paver path with the green valley beyond",
);

export function CTA() {
  return (
    <section
      aria-label="Enquire"
      className="section-space relative isolate overflow-hidden bg-surface theme-sand text-body"
    >
      <VideoBackground poster={poster} sources={estateVideoSources} />
      <div aria-hidden="true" className="absolute inset-0 bg-sand/90" />
      <FloatingParticles />
      <div className="page-container relative grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="label-mono text-body">05 — Enquire</p>
          <RevealText
            lines={[{ text: "Ask us about" }, { text: "your ", emphasis: "dates." }]}
            className="mt-4 text-h1"
          />
          <p className="mt-4 max-w-[46ch] text-body/80">
            Tell us when you would like to come and who is coming. We reply with
            availability and rates.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Enquire Now
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline gap-2"
            >
              <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="relative mx-auto hidden w-full max-w-xs overflow-hidden lg:col-span-5 lg:mx-0 lg:ml-auto lg:block">
          <div className="arch-frame relative aspect-[4/5] overflow-hidden bg-surface theme-sage">
            <Photo image={poster} fill sizes="28vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
