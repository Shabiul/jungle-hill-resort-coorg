import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Stays", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Dining", href: "/dining" },
  { label: "Destinations", href: "/tourist-destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Packages & Offers", href: "/packages-offers" },
  { label: "Plan Your Stay", href: "/plan-your-stay" },
  { label: "Contact", href: "/contact" },
];

/** Desktop header (xl and up); everything else lives in the menu and footer. */
export const headerNav: NavItem[] = mainNav.filter((item) =>
  [
    "/rooms",
    "/experiences",
    "/dining",
    "/tourist-destinations",
    "/gallery",
    "/testimonials",
    "/plan-your-stay",
    "/contact",
  ].includes(item.href),
);

export const xlOnlyHrefs: string[] = [];

export const bookingNav: NavItem = { label: "Enquire", href: "/booking" };
