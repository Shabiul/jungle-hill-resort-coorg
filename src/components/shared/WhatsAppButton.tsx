"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { defaultEnquiryMessage, telLink, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
}

/**
 * Floating contact buttons: WhatsApp everywhere, plus Call on small screens.
 * Hidden at the very top of a page so they never cover the hero enquiry bar.
 */
export function WhatsAppButton({ message = defaultEnquiryMessage }: WhatsAppButtonProps) {
  const visible = useScrollPosition() > 500;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 transition-all duration-300 sm:right-6 sm:bottom-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={visible ? undefined : true}
    >
      <a
        href={telLink}
        tabIndex={visible ? 0 : -1}
        aria-label="Call Jungle Hill Resort"
        className="btn btn-primary h-12 w-12 p-0 shadow-lg sm:hidden"
      >
        <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
      </a>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Chat with Jungle Hill Resort on WhatsApp"
        className="btn btn-primary h-12 gap-2 px-4 shadow-lg sm:px-5"
      >
        <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
