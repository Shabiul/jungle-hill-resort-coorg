import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Jungle Hill Resort, Coorg",
  shortName: "Jungle Hill Resort",
  tagline: "Inspiring Cloudline",
  description:
    "A nature retreat in the coffee and pepper plantations of Coorg, 5 km from Madikeri on the way to Virajpet. 13 rooms, a swimming pool, a kids play area and an in-house restaurant.",
  // TODO: confirm the live domain. Used for canonical URLs, the sitemap, Open Graph and JSON-LD.
  siteUrl: "https://www.junglehillresort.co.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.junglehillresort.co.in",
  locale: "en_IN",
  // Second contact number, shown as a plain number with no name or role.
  secondaryPhone: {
    phoneDisplay: "+91 96115 24368",
    phoneTel: "+919611524368",
  },
  contact: {
    email: "reservations@junglehillresort.co.in",
    phoneDisplay: "+91 95916 90481",
    phoneTel: "+919591690481",
    whatsapp: "919591690481",
    addressLines: ["Mekeri Village, Madikeri", "Coorg, Karnataka 571201"], // TODO: confirm spelling ("Mekeri" vs "Makeri")
    addressOneLine: "Mekeri Village, Madikeri, Coorg, Karnataka 571201",
    mapsUrl: "", // TODO: Google Maps link for the property
  },
  floatingContact: {
    phoneDisplay: "+91 96115 24368",
    phoneTel: "+919611524368",
    whatsapp: "919611524368",
  },
  stay: { checkIn: "12:00 PM", checkOut: "11:00 AM" },
  socials: [], // TODO: Instagram, Facebook, etc.
  developer: {
    name: "Naaz Ai Labs",
    url: "https://naazailabs.com", // TODO: replace with the real Naaz Ai Labs website URL
  },
};

export const developerUrl = siteConfig.developer.url;
