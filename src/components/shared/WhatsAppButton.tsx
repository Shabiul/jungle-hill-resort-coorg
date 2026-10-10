"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { defaultEnquiryMessage, telLink, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface FloatingContactProps {
  message?: string;
}

const pill =
  "floating-pill inline-flex h-11 items-center justify-center gap-2 rounded-full border border-champagne/70 bg-slate/85 px-4 text-pearl backdrop-blur-xl transition-colors hover:bg-storm";

/**
 * Floating Enquire Now, Call and WhatsApp, stacked bottom right. Shown after the first screen,
 * hidden while the footer is on screen so they never cover it. Icons only on small screens
 * (44px touch targets); the number shows from sm up.
 */
export function WhatsAppButton({
  message = defaultEnquiryMessage,
}: FloatingContactProps) {
  const scrolled = useScrollPosition() > 500;
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      {
        threshold: 0,
      },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !overFooter;
  const tabIndex = visible ? 0 : -1;

  return (
    <div
      className={cn(
        "floating-contact pointer-events-none fixed right-4 bottom-4 z-[91] flex flex-col items-end gap-2 transition-all duration-300 sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      aria-hidden={visible ? undefined : true}
    >
      <Link
        href="/booking"
        tabIndex={tabIndex}
        className={cn(pill, "label-mono px-6", visible && "pointer-events-auto")}
      >
        Enquire Now
      </Link>
      <a
        href={telLink}
        tabIndex={tabIndex}
        aria-label="Call Jungle Hill Resort"
        className={cn(
          pill,
          "w-11 px-0 sm:w-auto sm:px-5",
          visible && "pointer-events-auto",
        )}
      >
        <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
        <span className="label-mono hidden sm:inline">Call</span>
        <span className="hidden text-small sm:inline">
          {siteConfig.contact.phoneDisplay}
        </span>
      </a>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
        aria-label="Chat on WhatsApp"
        className={cn(
          pill,
          "w-11 px-0 sm:w-auto sm:px-5",
          visible && "pointer-events-auto",
        )}
      >
        <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
        <span className="label-mono hidden sm:inline">WhatsApp</span>
        <span className="hidden text-small sm:inline">
          {siteConfig.contact.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
