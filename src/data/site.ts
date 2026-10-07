import { existsSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site.config";
import { compact, photo } from "@/lib/images";

export const site = siteConfig;

/** Facts for the "At a glance" strip. Only what the resort has stated. */
export const glanceFacts = [
  { label: "Location", value: "5 km from Madikeri" },
  { label: "Rooms", value: "13 rooms" },
  { label: "Pool", value: "Swimming pool" },
  { label: "Restaurant", value: "7 AM to 10 PM" },
  { label: "Check-in", value: "12 PM" },
];

// Hero media. TODO: swap in a licensed atmospheric clip: /public/videos/hero-mist.mp4 + .webm
export const heroPoster =
  compact([
    photo(
      "/images/gallery/grounds-cottages-garden.jpg",
      "Tiled-roof cottages among the garden and plantation, with the valley beyond",
    ),
    photo(
      "/images/gallery/grounds-misty-valley.jpg",
      "Mist rising over the valley beyond the tiled roofs of the resort",
    ),
    photo(
      "/images/rooms/deluxe-ac-rooms/balcony-01.jpg",
      "View from a Deluxe AC room balcony over trees and green hills",
    ),
  ])[0] ?? null;

// Only clips that exist in /public/videos are wired up, so the poster photo shows until they do.
const heroClips = [
  { src: "/videos/hero-mist.webm", type: "video/webm" },
  { src: "/videos/hero-mist.mp4", type: "video/mp4" },
] as const;

export const heroVideoSources = heroClips.filter((clip) =>
  existsSync(path.join(process.cwd(), "public", clip.src)),
);

export const homeImages = {
  welcomeA: photo(
    "/images/gallery/grounds-rooms-and-stairs.jpg",
    "Room blocks and a stair above the red paver walkway",
  ),
  welcomeB: photo(
    "/images/gallery/grounds-cottages-garden.jpg",
    "Cottages with tiled roofs among the garden and plantation",
  ),
  diningA: photo(
    "/images/gallery/dining-restaurant-entrance.jpg",
    "Restaurant entrance framed by coffee plants",
  ),
  diningB: photo(
    "/images/gallery/dining-glasses-detail.jpg",
    "Glasses on a restaurant table with the valley blurred behind",
  ),
};
