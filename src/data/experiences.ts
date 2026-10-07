import { photo } from "@/lib/images";
import type { Experience } from "@/types";

const g = "/images/gallery";

export const experiences: Experience[] = [
  {
    slug: "swimming-pool",
    title: "Swimming pool",
    label: "Pool",
    summary:
      "An open pool set among palms and plantation, with a shallow section for children.",
    facts: [
      "7:00 AM to 7:00 PM",
      "Maximum depth 4.7 ft",
      "Kids pool depth 2.5 ft",
      "Swimwear or nylon dresses only",
      "No food or drinks in the pool area",
    ],
    image:
      photo(
        `${g}/pool-with-kids-pool.jpg`,
        "Swimming pool and shallow kids pool with palms behind",
      ) ?? undefined,
  },
  {
    slug: "kids-park",
    title: "Kids park",
    label: "Kids",
    summary:
      "A safe, child-friendly open play area amid the trees: see-saw, giraffe slide, swings and more.",
    facts: ["For children under 10"],
  },
  {
    slug: "indoor-games",
    title: "Indoor games",
    label: "Indoor",
    summary: "Carrom, table tennis, ludo, chess and foosball.",
    facts: ["Carrom", "Table tennis", "Ludo", "Chess", "Foosball"],
    image:
      photo(`${g}/games-foosball.jpg`, "Foosball table with red and blue players") ??
      undefined,
  },
  {
    slug: "outdoor-games",
    title: "Outdoor games",
    label: "Outdoor",
    summary: "Shuttle badminton, played within the property premises.",
    facts: ["Shuttle badminton, within the property premises"],
  },
];
