import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site.config";
import { mailLink, managerTelLink, mapsHref, telLink, whatsappLink } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Call, WhatsApp or write to Jungle Hill Resort, Mekeri Village, Madikeri, Coorg. Reservations +91 95916 90481.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, manager, owners } = siteConfig;

  return (
    <>
      <PageHero
        label="09 — Contact"
        lines={[{ text: "Talk to" }, { text: "us ", emphasis: "directly." }]}
        description={<p>The quickest way to reach us is a call or a WhatsApp message.</p>}
      />

      <section aria-label="Contact details and form" className="pb-12">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="border-t border-ink">
              <li className="border-b border-ink/20 py-5">
                <p className="label-mono text-emerald">Reservations and WhatsApp</p>
                <a
                  href={telLink}
                  className="link-underline mt-1 inline-flex items-center gap-2 font-display text-3xl"
                >
                  <Phone size={20} strokeWidth={1.5} aria-hidden="true" />{" "}
                  {contact.phoneDisplay}
                </a>
                <p className="mt-3">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary gap-2"
                  >
                    <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />{" "}
                    Message on WhatsApp
                  </a>
                </p>
              </li>
              <li className="border-b border-ink/20 py-5">
                <p className="label-mono text-emerald">Email</p>
                <a
                  href={mailLink}
                  className="link-underline mt-1 inline-flex items-center gap-2 text-body-lg"
                >
                  <Mail size={18} strokeWidth={1.5} aria-hidden="true" /> {contact.email}
                </a>
              </li>
              <li className="border-b border-ink/20 py-5">
                <p className="label-mono text-emerald">Manager</p>
                <p className="mt-1 font-display text-2xl">{manager.name}</p>
                <a href={managerTelLink} className="link-underline">
                  {manager.phoneDisplay}
                </a>
              </li>
              <li className="border-b border-ink/20 py-5">
                <p className="label-mono text-emerald">Address</p>
                <address className="mt-1 font-display text-2xl not-italic">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={mapsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-2 inline-flex items-center gap-2"
                >
                  <MapPin size={16} strokeWidth={1.5} aria-hidden="true" /> Open in Google
                  Maps
                </a>
              </li>
              <li className="border-b border-ink/20 py-5">
                <p className="label-mono text-emerald">Owners</p>
                <p className="mt-1">{owners}</p>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-h3">Write to us</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
