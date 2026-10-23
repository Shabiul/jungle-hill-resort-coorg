import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FooterCredit } from "@/components/layout/FooterCredit";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/config/site.config";
import { mainNav } from "@/data/navigation";
import { mailLink, telLink, whatsappLink } from "@/lib/contact";

/** Compact footer in three quiet rows: logo and links, contact details, credit. No rules. */
export function Footer() {
  const { contact } = siteConfig;
  const linkClass = "transition-colors hover:text-burgundy";

  return (
    <footer className="theme-sand bg-surface text-body">
      <div className="page-container py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Logo variant="dark" asLink={false} className="h-14" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-small">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className={`touch-target ${linkClass}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  prefetch={false}
                  href="/booking"
                  className={`touch-target ${linkClass}`}
                >
                  Enquire / Book
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-1 text-small">
          <li>
            <a
              href={telLink}
              className={`touch-target inline-flex items-center gap-2 ${linkClass}`}
            >
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`touch-target inline-flex items-center gap-2 ${linkClass}`}
            >
              <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href={mailLink}
              className={`touch-target inline-flex items-center gap-2 ${linkClass}`}
            >
              <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
              {contact.email}
            </a>
          </li>
          <li className="inline-flex min-h-11 items-center gap-2">
            <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
            <address className="not-italic">{contact.addressOneLine}</address>
          </li>
        </ul>

        <p className="mt-3 max-w-none text-small">
          Check-in 12 PM · Check-out 11 AM. ID proof mandatory. No visitors after 8:30 PM.
          No loud music or sounds after 10:00 PM.
        </p>

        <FooterCredit />
      </div>
    </footer>
  );
}
