import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FooterCredit } from "@/components/layout/FooterCredit";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/config/site.config";
import { mainNav } from "@/data/navigation";
import { mailLink, secondaryTelLink, telLink, whatsappLink } from "@/lib/contact";

export function Footer() {
  const { contact, secondaryPhone } = siteConfig;

  return (
    <footer className="dark-surface bg-abyss text-mist">
      <div className="page-container pt-[var(--space-section)] pb-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="light" asLink={false} className="h-24" />
            <p
              aria-hidden="true"
              className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-medium tracking-[0.03em] text-transparent [-webkit-text-stroke:1.5px_var(--color-champagne-soft)]"
            >
              JUNGLE
              <br />
              HILL
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h2 className="label-mono text-mist/80">Visit</h2>
              <address className="mt-3 not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={telLink}
                    className="inline-flex items-center gap-2 transition-colors hover:text-aqua"
                  >
                    <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                    Call {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-aqua"
                  >
                    <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                    WhatsApp {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={mailLink}
                    className="inline-flex items-center gap-2 transition-colors hover:text-aqua"
                  >
                    <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
              </ul>

              <p className="mt-5 text-mist/80">
                <a
                  href={secondaryTelLink}
                  className="transition-colors hover:text-aqua"
                >
                  {secondaryPhone.phoneDisplay}
                </a>
              </p>
            </div>

            <div>
              <h2 className="label-mono text-mist/80">Explore</h2>
              <ul className="mt-3 grid gap-1.5">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      prefetch={false}
                      href={item.href}
                      className="transition-colors hover:text-aqua"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    prefetch={false}
                    href="/booking"
                    className="transition-colors hover:text-aqua"
                  >
                    Enquire / Book
                  </Link>
                </li>
              </ul>
              <p className="label-mono mt-6 text-mist/80">
                Check-in 12 PM · Check-out 11 AM
              </p>
              <p className="mt-2 text-sm text-mist/80">
                ID proof mandatory. No visitors after 8:30 PM. No loud music or sounds
                after 10:00 PM.
              </p>
            </div>
          </div>
        </div>

        <FooterCredit />
      </div>
    </footer>
  );
}
