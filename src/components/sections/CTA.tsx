import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { VideoBackground } from "@/components/animations/VideoBackground";
import { RevealText } from "@/components/animations/RevealText";
import { estateVideoSources } from "@/data/site";
import { photo } from "@/lib/images";
import { whatsappLink } from "@/lib/contact";

const poster = photo(
  "/images/gallery/grounds-valley-path.jpg",
  "Paver path with the green valley beyond",
);

export function CTA() {
  return (
    <section
      aria-label="Enquire"
      className="dark-surface section-space relative isolate overflow-hidden bg-forest text-ivory"
    >
      <VideoBackground poster={poster} sources={estateVideoSources} />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />
      <div className="page-container relative">
        <p className="label-mono text-brass-soft">05 — Enquire</p>
        <RevealText
          onDark
          lines={[{ text: "Ask us about" }, { text: "your ", emphasis: "dates." }]}
          className="mt-4 text-h1"
        />
        <p className="mt-4 max-w-[46ch] text-ivory/85">
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
    </section>
  );
}
