import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import { siteConfig } from "@/config/site.config";
import { telLink, whatsappLink } from "@/lib/contact";

export function CTA() {
  return (
    <section
      aria-label="Enquire"
      className="dark-surface section-space bg-forest text-ivory"
    >
      <div className="page-container">
        <p className="label-mono text-ivory/75">09 / Enquire</p>
        <RevealText
          onDark
          lines={[{ text: "Ask us about" }, { text: "your ", emphasis: "dates." }]}
          className="mt-5 text-h1"
        />
        <p className="mt-4 max-w-xl text-ivory/85">
          There is no booking engine yet. Tell us when you would like to come and who is
          coming, and we will reply with availability and rates.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/booking" className="btn btn-primary">
            Send an enquiry
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light gap-2"
          >
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" /> WhatsApp
          </a>
          <a href={telLink} className="btn btn-outline-light gap-2">
            <Phone size={16} strokeWidth={1.5} aria-hidden="true" />{" "}
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
