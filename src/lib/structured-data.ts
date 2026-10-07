import { siteConfig } from "@/config/site.config";

/** schema.org LodgingBusiness. No ratings: only facts supplied by the resort. */
export function resortJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Resort", "LodgingBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneTel,
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mekeri Village, Madikeri",
      addressLocality: "Madikeri",
      addressRegion: "Karnataka",
      postalCode: "571201",
      addressCountry: "IN",
    },
    checkinTime: "12:00",
    checkoutTime: "11:00",
    numberOfRooms: 13,
    amenityFeature: [
      "Swimming pool",
      "Kids play area",
      "Restaurant",
      "Indoor games",
      "Outdoor shuttle badminton",
      "Parking",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  };
}
