"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { defaultEnquiryMessage, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface FloatingEnquiryProps {
  message?: string;
}

/**
 * Floating "Enquire Now" pill and a WhatsApp icon, bottom right. They appear after the first
 * screen so they never sit on top of the hero booking bar.
 */
export function WhatsAppButton({
  message = defaultEnquiryMessage,
}: FloatingEnquiryProps) {
  const visible = useScrollPosition() > 500;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-40 flex items-center gap-2 transition-all duration-300 sm:right-6 sm:bottom-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={visible ? undefined : true}
    >
      <Link
        href="/booking"
        tabIndex={visible ? 0 : -1}
        className="btn btn-primary h-12 rounded-full px-6 shadow-lg"
      >
        Enquire Now
      </Link>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Chat with Jungle Hill Resort on WhatsApp"
        className="btn btn-primary h-12 w-12 rounded-full p-0 shadow-lg"
      >
        <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
