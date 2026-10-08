import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages & Offers", href: "/packages-offers" },
  { label: "Plan Your Stay", href: "/plan-your-stay" },
  { label: "Contact", href: "/contact" },
];

/** Shorter list for the desktop header; the rest live in the menu and footer. */
/** Desktop header. About and Contact only show from xl up; the menu and footer carry everything. */
export const headerNav: NavItem[] = mainNav.filter((item) =>
  [
    "/about",
    "/rooms",
    "/experiences",
    "/dining",
    "/gallery",
    "/plan-your-stay",
    "/contact",
  ].includes(item.href),
);

export const xlOnlyHrefs = ["/about", "/contact"];

export const bookingNav: NavItem = { label: "Enquire", href: "/booking" };
