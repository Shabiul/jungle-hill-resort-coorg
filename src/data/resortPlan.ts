import { photo } from "@/lib/images";
import type { ImageAsset } from "@/types";

export interface PlanMarker {
  id: number;
  label: string;
  note: string;
  /** Position in the 1000 x 620 plan viewBox. */
  x: number;
  y: number;
  kind: "building" | "amenity" | "pool";
  /** Stays link to their page from the legend. */
  href?: string;
  image: ImageAsset | null;
}

export const PLAN_VIEWBOX = { width: 1000, height: 620 } as const;

// TODO: positions are a believable schematic, NOT surveyed. Replace x/y with the real layout once the
// resort supplies a site plan. No distances are claimed. The numbers follow a suggested walking order:
// the route line in ResortPlan.tsx is drawn through the markers in id order, so reorder here to re-route.
export const planMarkers: PlanMarker[] = [
  {
    id: 1,
    label: "Reception",
    note: "Check-in 12 PM, check-out 11 AM",
    x: 500,
    y: 470,
    kind: "building",
    image: photo(
      "/images/gallery/reception-exterior.jpg",
      "Reception building with a red roof",
    ),
  },
  {
    id: 2,
    label: "Swimming Pool",
    note: "7 AM to 7 PM, max depth 4.7 ft",
    x: 730,
    y: 440,
    kind: "pool",
    image: photo("/images/gallery/pool-with-kids-pool.jpg", "Pool and kids pool"),
  },
  {
    id: 3,
    label: "Restaurant",
    note: "7 AM to 10 PM",
    x: 880,
    y: 340,
    kind: "building",
    image: photo("/images/gallery/dining-restaurant-entrance.jpg", "Restaurant entrance"),
  },
  {
    id: 4,
    label: "Games Room",
    note: "Table tennis, carrom, foosball and more",
    x: 850,
    y: 200,
    kind: "amenity",
    image: photo("/images/gallery/games-table-tennis.jpg", "Table-tennis table"),
  },
  {
    id: 5,
    label: "Kids Park",
    note: "For children under 10",
    x: 700,
    y: 110,
    kind: "amenity",
    image: photo(
      "/images/gallery/kids-park-sign-play.jpg",
      "Kids Park sign and play frame",
    ),
  },
  {
    id: 6,
    label: "Family Rooms (The Estate House)",
    href: "/rooms/family-ac-room",
    note: "Family AC, ground and first floor",
    x: 540,
    y: 170,
    kind: "building",
    image: photo(
      "/images/rooms/family-ac-room/seating-01.jpg",
      "Family AC room seating area",
    ),
  },
  {
    id: 7,
    label: "Standard Non-AC Rooms",
    href: "/rooms/standard-non-ac-room",
    note: "Rooms A2, A3, A5 upstairs, A6 on the ground floor",
    x: 380,
    y: 240,
    kind: "building",
    image: photo(
      "/images/rooms/standard-non-ac-room/entrance-a6.jpg",
      "Entrance to room A-6",
    ),
  },
  {
    id: 8,
    label: "Deluxe AC Rooms (The Cloudline Suite)",
    href: "/rooms/deluxe-ac-rooms",
    note: "Deluxe AC rooms with private balconies",
    x: 250,
    y: 320,
    kind: "building",
    image: photo(
      "/images/rooms/deluxe-ac-rooms/exterior-01.jpg",
      "Deluxe block with balconies",
    ),
  },
  // TODO: confirm. The ninth stop is an assumption (the brief listed eight places plus "one more").
  // Change or remove this entry freely; the legend and the route follow the array.
  {
    id: 9,
    label: "Standard Non-AC Cottage (The Pepper Vine Cottage)",
    href: "/rooms/standard-non-ac-cottage",
    note: "Standard Non-AC Cottage",
    x: 150,
    y: 430,
    kind: "building",
    image: photo(
      "/images/rooms/standard-non-ac-cottage/exterior-01.jpg",
      "Cottage with timber balcony",
    ),
  },
];

export const gettingHere = [
  { label: "Madikeri", detail: "Start" },
  { label: "5 km", detail: "towards Virajpet" },
  { label: "Jungle Hill Resort", detail: "Mekeri Village" },
  { label: "Virajpet", detail: "Further along the road" },
];
