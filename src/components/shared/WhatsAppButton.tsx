import { MessageCircle, Phone } from "lucide-react";
import { defaultEnquiryMessage, telLink, whatsappLink } from "@/lib/contact";

interface WhatsAppButtonProps {
  message?: string;
}

/** Floating contact buttons: WhatsApp everywhere, plus Call on small screens. */
export function WhatsAppButton({ message = defaultEnquiryMessage }: WhatsAppButtonProps) {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      <a
        href={telLink}
        aria-label="Call Jungle Hill Resort"
        className="btn btn-dark h-12 w-12 border-paper/30 p-0 shadow-lg sm:hidden"
      >
        <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
      </a>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Jungle Hill Resort on WhatsApp"
        className="btn btn-primary h-12 gap-2 px-4 shadow-lg sm:px-5"
      >
        <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
