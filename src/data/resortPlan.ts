import { photo } from "@/lib/images";
import type { ImageAsset } from "@/types";

export interface PlanMarker {
  id: number;
  label: string;
  note: string;
  /** Position in the 600 x 620 plan viewBox. */
  x: number;
  y: number;
  kind: "building" | "amenity" | "pool";
  /** Stays link to their page from the legend. */
  href?: string;
  image: ImageAsset | null;
}

export const PLAN_VIEWBOX = { width: 600, height: 620 } as const;

/**
 * The resort path, drawn bottom to top as in the client's hand-drawn sketch: one winding S-shaped
 * path from the main gate to the Deluxe AC rooms, with branches. `delay` staggers the drawing.
 */
export const planPaths: { d: string; width: number; delay: number }[] = [
  // main path: gate, reception, pool junction, fork, kids park junction, up to the Deluxe rooms
  {
    d: "M360 590 C 305 560 300 520 330 490 C 400 450 440 410 430 360 C 420 295 350 255 300 235 C 240 215 190 190 200 150 C 205 110 250 85 295 60",
    width: 5,
    delay: 0,
  },
  // short stub to Reception (left of the path just after the gate)
  { d: "M322 497 L 256 497", width: 3.5, delay: 0.25 },
  // branch to the Swimming Pool (right, just above the gate)
  { d: "M318 532 C 350 515 390 512 426 512", width: 3.5, delay: 0.3 },
  // left branch at the fork to the Restaurant, with the Indoor Games spur above it
  { d: "M427 352 C 380 352 320 360 268 368", width: 3.5, delay: 0.5 },
  { d: "M268 368 L 258 296", width: 3.5, delay: 0.6 },
  // right branch at the fork to the Family and Standard rooms (and the cottage)
  { d: "M431 355 C 470 335 500 320 545 272", width: 3.5, delay: 0.55 },
  { d: "M500 316 C 525 322 545 335 558 350", width: 3, delay: 0.65 },
  // left branch higher up to the Kids Park
  { d: "M300 235 C 270 240 235 255 207 268", width: 3.5, delay: 0.75 },
];

// TODO: this follows the client's hand-drawn sketch but the positions are still a schematic, NOT
// surveyed. Replace x/y (and planPaths) with a real sketch or satellite screenshot when supplied.
// No distances are claimed. Numbers run along the path from the entry (bottom) to the top.
export const planMarkers: PlanMarker[] = [
  {
    id: 1,
    label: "Main Gate",
    note: "The way in, from the road",
    x: 360,
    y: 590,
    kind: "amenity",
    image: photo(
      "/images/gallery/grounds-driveway-palms.jpg",
      "Red paver driveway with palms and a room block beside it",
    ),
  },
  {
    id: 2,
    label: "Reception",
    note: "Check-in 12 PM, check-out 11 AM",
    x: 250,
    y: 497,
    kind: "building",
    image: photo(
      "/images/gallery/reception-exterior.jpg",
      "Reception building with a red roof beside the paver drive",
    ),
  },
  {
    id: 3,
    label: "Swimming Pool",
    note: "7 AM to 7 PM, max depth 4.7 ft",
    x: 430,
    y: 512,
    kind: "pool",
    image: photo(
      "/images/gallery/pool-with-kids-pool.jpg",
      "Swimming pool and shallow kids pool on a tiled deck with chairs",
    ),
  },
  {
    id: 4,
    label: "Restaurant",
    note: "7 AM to 10 PM",
    x: 262,
    y: 368,
    kind: "building",
    image: photo(
      "/images/gallery/dining-restaurant-entrance.jpg",
      "Restaurant entrance framed by coffee plants",
    ),
  },
  {
    id: 5,
    label: "Indoor Games",
    note: "Carrom, table tennis, ludo, chess and foosball",
    x: 257,
    y: 290,
    kind: "amenity",
    image: photo(
      "/images/gallery/games-table-tennis.jpg",
      "Blue table-tennis table under a roof among trees",
    ),
  },
  {
    id: 6,
    label: "Family Rooms (The Estate House)",
    note: "Family AC, ground and first floor",
    href: "/rooms/family-ac-room",
    x: 490,
    y: 312,
    kind: "building",
    image: photo(
      "/images/rooms/family-ac-room/seating-01.jpg",
      "Family AC room seating area",
    ),
  },
  {
    id: 7,
    label: "Standard Non-AC Rooms",
    note: "Rooms A2, A3, A5 upstairs, A6 on the ground floor",
    href: "/rooms/standard-non-ac-room",
    x: 548,
    y: 268,
    kind: "building",
    image: photo(
      "/images/rooms/standard-non-ac-room/entrance-a6.jpg",
      "Entrance to room A6 with two chairs on a stone floor",
    ),
  },
  {
    id: 8,
    label: "Kids Park",
    note: "For children under 10",
    x: 203,
    y: 270,
    kind: "amenity",
    image: photo(
      "/images/gallery/kids-park-sign-play.jpg",
      "Kids Park sign with climbing frame and slide",
    ),
  },
  {
    id: 9,
    label: "Deluxe AC Rooms (The Cloudline Suite)",
    note: "Deluxe AC rooms with private balconies",
    href: "/rooms/deluxe-ac-rooms",
    x: 295,
    y: 60,
    kind: "building",
    image: photo(
      "/images/rooms/deluxe-ac-rooms/exterior-01.jpg",
      "Deluxe block with balconies among tall trees",
    ),
  },
  // TODO: confirm position with the client. The sketch does not show the cottage; it is placed
  // near the other standard rooms for now (position to be confirmed).
  {
    id: 10,
    label: "Standard Non-AC Cottage (The Pepper Vine Cottage)",
    note: "Standard Non-AC Cottage",
    href: "/rooms/standard-non-ac-cottage",
    x: 560,
    y: 352,
    kind: "building",
    image: photo(
      "/images/rooms/standard-non-ac-cottage/exterior-02.jpg",
      "Cottage with a red tiled roof among bamboo",
    ),
  },
];

export const gettingHere = [
  { label: "Madikeri", detail: "Start" },
  { label: "5 km", detail: "towards Virajpet" },
  { label: "Jungle Hill Resort", detail: "Mekeri Village" },
  { label: "Virajpet", detail: "Further along the road" },
];
