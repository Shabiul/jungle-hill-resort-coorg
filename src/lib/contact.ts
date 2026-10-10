import { siteConfig } from "@/config/site.config";

export function whatsappLink(message?: string) {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.contact.whatsapp}${query}`;
}

export const telLink = `tel:${siteConfig.contact.phoneTel}`;
export const managerTelLink = `tel:${siteConfig.manager.phoneTel}`;

export const defaultEnquiryMessage =
  "Hello Jungle Hill Resort, I would like to enquire about a stay.";

/** Google Maps link: the supplied one when set, otherwise a search for the address. */
export function mapsHref() {
  return (
    siteConfig.contact.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.addressOneLine)}`
  );
}

export const mailLink = `mailto:${siteConfig.contact.email}`;
