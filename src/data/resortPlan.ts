import { photo } from "@/lib/images";
import type { ImageAsset } from "@/types";

export interface PlanMarker {
  id: number;
  label: string;
  note: string;
  /** Position in the 1000 x 620 plan viewBox. */
  x: number;
  y: number;
  kind: "building" | "amenity" | "area";
  image: ImageAsset | null;
}

export const PLAN_VIEWBOX = { width: 1000, height: 620 } as const;

// TODO: positions are a believable schematic, NOT surveyed. Replace x/y (and the shapes in
// ResortPlan.tsx) with the real layout once the resort supplies a site plan. No distances are claimed.
export const planMarkers: PlanMarker[] = [
  {
    id: 1,
    label: "Reception",
    note: "Check-in 12 PM, check-out 11 AM",
    x: 560,
    y: 410,
    kind: "building",
    image: photo(
      "/images/gallery/reception-exterior.jpg",
      "Reception building with a red roof",
    ),
  },
  {
    id: 2,
    label: "The Coffee Leaf Nook",
    note: "Rooms A2, A3, A5 upstairs, A6 on the ground floor",
    x: 330,
    y: 300,
    kind: "building",
    image: photo(
      "/images/rooms/standard-non-ac-room/entrance-a6.jpg",
      "Entrance to room A-6",
    ),
  },
  {
    id: 3,
    label: "The Pepper Vine Cottage",
    note: "Standard Non-AC Cottage",
    x: 215,
    y: 195,
    kind: "building",
    image: photo(
      "/images/rooms/standard-non-ac-cottage/exterior-01.jpg",
      "Cottage with timber balcony",
    ),
  },
  {
    id: 4,
    label: "The Cloudline Suite",
    note: "Deluxe AC rooms with private balconies",
    x: 440,
    y: 195,
    kind: "building",
    image: photo(
      "/images/rooms/deluxe-ac-rooms/exterior-01.jpg",
      "Deluxe block with balconies",
    ),
  },
  {
    id: 5,
    label: "The Estate House",
    note: "Family AC, ground and first floor",
    x: 595,
    y: 140,
    kind: "building",
    image: photo(
      "/images/rooms/family-ac-room/seating-01.jpg",
      "Family AC room seating area",
    ),
  },
  {
    id: 6,
    label: "Restaurant",
    note: "7 AM to 10 PM",
    x: 705,
    y: 335,
    kind: "building",
    image: photo("/images/gallery/dining-restaurant-entrance.jpg", "Restaurant entrance"),
  },
  {
    id: 7,
    label: "Swimming Pool",
    note: "7 AM to 7 PM, max depth 4.7 ft",
    x: 810,
    y: 205,
    kind: "amenity",
    image: photo("/images/gallery/pool-with-kids-pool.jpg", "Pool and kids pool"),
  },
  {
    id: 8,
    label: "Kids Park",
    note: "For children under 10",
    x: 905,
    y: 300,
    kind: "amenity",
    image: photo(
      "/images/gallery/kids-park-sign-play.jpg",
      "Kids Park sign and play frame",
    ),
  },
  {
    id: 9,
    label: "Games Area",
    note: "Table tennis, carrom, foosball and more",
    x: 790,
    y: 440,
    kind: "amenity",
    image: photo("/images/gallery/games-table-tennis.jpg", "Table-tennis table"),
  },
  {
    id: 10,
    label: "Parking",
    note: "Guest parking",
    x: 420,
    y: 515,
    kind: "area",
    image: photo(
      "/images/gallery/grounds-paver-court-buildings.jpg",
      "Paver court at the entrance",
    ),
  },
  {
    id: 11,
    label: "Coffee and pepper plantation",
    note: "The estate around the resort",
    x: 120,
    y: 440,
    kind: "area",
    image: photo(
      "/images/gallery/grounds-cottages-garden.jpg",
      "Coffee plants and cottage roofs",
    ),
  },
];

export const gettingHere = [
  { label: "Madikeri", detail: "Start" },
  { label: "5 km", detail: "towards Virajpet" },
  { label: "Jungle Hill Resort", detail: "Mekeri Village" },
  { label: "Virajpet", detail: "Further along the road" },
];
