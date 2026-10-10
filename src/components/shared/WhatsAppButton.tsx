"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { defaultEnquiryMessage, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface FloatingContactProps {
  message?: string;
}

const pill =
  "floating-pill pointer-events-none inline-flex items-center justify-center border border-champagne/70 bg-slate text-pearl transition-colors hover:border-champagne-soft hover:bg-storm";
const round = "h-12 w-12 rounded-full";

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
        "floating-contact pointer-events-none fixed right-4 bottom-4 z-[91] flex flex-col items-end gap-3 transition-all duration-300 sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      aria-hidden={visible ? undefined : true}
    >
      <Link
        href="/booking"
        tabIndex={tabIndex}
        className={cn(
          pill,
          "label-mono h-11 rounded-full px-6",
          visible && "pointer-events-auto",
        )}
      >
        Enquire Now
      </Link>
      <a
        href={`tel:${siteConfig.floatingContact.phoneTel}`}
        tabIndex={tabIndex}
        aria-label="Call Jungle Hill Resort"
        className={cn(pill, round, visible && "pointer-events-auto")}
      >
        <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
      </a>
      <a
        href={whatsappLink(message, siteConfig.floatingContact.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
        aria-label="Chat on WhatsApp"
        className={cn(pill, round, visible && "pointer-events-auto")}
      >
        <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
