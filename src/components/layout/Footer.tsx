import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/config/site.config";
import { mainNav } from "@/data/navigation";
import { mailLink, managerTelLink, telLink, whatsappLink } from "@/lib/contact";

export function Footer() {
  const { contact, manager, owners, developer } = siteConfig;

  return (
    <footer className="dark-surface bg-night text-pearl">
      <div className="page-container pt-[var(--space-section)] pb-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="light" asLink={false} className="h-24" />
            <p
              aria-hidden="true"
              className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[0.03em] text-transparent [-webkit-text-stroke:1.5px_var(--color-champagne-soft)]"
            >
              JUNGLE
              <br />
              HILL
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h2 className="label-mono text-pearl/70">Visit</h2>
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
                    aria-label={`Call Jungle Hill Resort on ${contact.phoneDisplay}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-champagne-soft"
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
                    aria-label={`Chat on WhatsApp on ${contact.phoneDisplay}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-champagne-soft"
                  >
                    <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                    WhatsApp {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={mailLink}
                    className="inline-flex items-center gap-2 transition-colors hover:text-champagne-soft"
                  >
                    <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
              </ul>

              <p className="mt-5 text-pearl/80">
                Manager: {manager.name},{" "}
                <a
                  href={managerTelLink}
                  className="transition-colors hover:text-champagne-soft"
                >
                  {manager.phoneDisplay}
                </a>
              </p>
              <p className="mt-1 text-pearl/80">Owners: {owners}</p>
            </div>

            <div>
              <h2 className="label-mono text-pearl/70">Explore</h2>
              <ul className="mt-3 grid gap-1.5">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-champagne-soft"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/booking"
                    className="transition-colors hover:text-champagne-soft"
                  >
                    Enquire / Book
                  </Link>
                </li>
              </ul>
              <p className="label-mono mt-6 text-pearl/70">
                Check-in 12 PM · Check-out 11 AM
              </p>
              <p className="mt-2 text-sm text-pearl/70">
                ID proof mandatory. Visitors are not allowed. No loud music or parties.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1.5 pt-5 text-center text-sm text-pearl/75">
          <p>&copy; {new Date().getFullYear()} Jungle Hill Resort</p>
          <p>
            Designed and developed by{" "}
            {developer.url ? (
              <a
                href={developer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-champagne transition-colors hover:text-champagne-soft"
              >
                {developer.name}
              </a>
            ) : (
              // TODO: set developer.url in config/site.config.ts so this becomes a link
              <span className="font-medium text-champagne">{developer.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
