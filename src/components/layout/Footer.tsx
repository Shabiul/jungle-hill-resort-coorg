import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { mainNav } from "@/data/navigation";
import { managerTelLink, telLink, whatsappLink } from "@/lib/contact";

export function Footer() {
  const { contact, manager, owners, developer } = siteConfig;

  return (
    <footer className="dark-surface bg-ink text-ivory">
      <div className="page-container pt-20 pb-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label-mono text-ivory/70">{siteConfig.tagline}</p>
            <p
              aria-label="Jungle Hill"
              className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] font-bold tracking-[0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--color-brass-soft)]"
            >
              JUNGLE
              <br />
              HILL
            </p>
            <p className="mt-6 max-w-sm text-ivory/80">
              A nature retreat in the coffee and pepper plantations, 5 km from Madikeri on
              the way to Virajpet.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h2 className="label-mono text-ivory/70">Visit</h2>
              <address className="mt-4 not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <ul className="mt-6 space-y-3">
                <li>
                  <a
                    href={telLink}
                    className="link-underline inline-flex items-center gap-2"
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
                    className="link-underline inline-flex items-center gap-2"
                  >
                    <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                    WhatsApp, same number
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-ivory/80">
                Manager: {manager.name},{" "}
                <a href={managerTelLink} className="link-underline">
                  {manager.phoneDisplay}
                </a>
              </p>
              <p className="mt-1 text-ivory/80">Owners: {owners}</p>
            </div>

            <div>
              <h2 className="label-mono text-ivory/70">Explore</h2>
              <ul className="mt-4 grid gap-2">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/booking" className="link-underline">
                    Enquire / Book
                  </Link>
                </li>
              </ul>
              <p className="label-mono mt-8 text-ivory/70">
                Check-in 12 PM · Check-out 11 AM
              </p>
              <p className="mt-2 text-sm text-ivory/70">
                ID proof mandatory. Visitors are not allowed. No loud music or parties.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ivory/15 pt-6 text-sm text-ivory/75 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Jungle Hill Resort</p>
          <p>
            Designed and developed by{" "}
            {developer.url ? (
              <a
                href={developer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ivory"
              >
                {developer.name}
              </a>
            ) : (
              // TODO: set developer.url in config/site.config.ts so this becomes a link
              <span className="text-ivory">{developer.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
