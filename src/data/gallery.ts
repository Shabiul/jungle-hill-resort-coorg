import { compact, photo } from "@/lib/images";
import { dining } from "@/data/dining";
import { rooms } from "@/data/rooms";
import type { GalleryCategory, GalleryImage } from "@/types";

const g = "/images/gallery";

function entry(
  file: string,
  alt: string,
  category: GalleryCategory,
): GalleryImage | null {
  const image = photo(`${g}/${file}`, alt);
  return image ? { ...image, category } : null;
}

// Files that are not in public/images/gallery are skipped. Re-run `npm run images` after adding photos.
const grounds: (GalleryImage | null)[] = [
  entry(
    "grounds-building-garden.jpg",
    "Guest building with a stone base and lawn in front",
    "Grounds",
  ),
  entry(
    "grounds-paver-driveway.jpg",
    "Red paver driveway curving past the room blocks",
    "Grounds",
  ),
  entry(
    "grounds-valley-view.jpg",
    "View over the valley through palms and plantation",
    "Grounds",
  ),
  entry("grounds-paver-path-01.jpg", "Red paver path winding through trees", "Grounds"),
  entry(
    "grounds-paver-path-02.jpg",
    "Red paver path with hills in the distance",
    "Grounds",
  ),
  entry(
    "grounds-paver-path-03.jpg",
    "Paver path beneath tall trees and blue sky",
    "Grounds",
  ),
  entry(
    "grounds-pavilion-green-roof.jpg",
    "Open pavilion with a green tiled roof beside the paver path",
    "Grounds",
  ),
  entry(
    "grounds-misty-valley.jpg",
    "Mist over the valley beyond the resort's tiled roofs",
    "Grounds",
  ),
  entry(
    "grounds-tiled-roof-cottages.jpg",
    "Tiled-roof cottages above a red paver driveway",
    "Grounds",
  ),
  entry(
    "grounds-two-storey-block-01.jpg",
    "White two-storey room block with a stone staircase",
    "Grounds",
  ),
  entry(
    "grounds-cottages-garden.jpg",
    "Cottages among the garden and plantation",
    "Grounds",
  ),
  entry(
    "grounds-two-storey-block-02.jpg",
    "Two-storey room block with a tiled roof and balcony",
    "Grounds",
  ),
  entry(
    "grounds-rooms-and-stairs.jpg",
    "Room blocks with a stair and a red paver walkway",
    "Grounds",
  ),
  entry(
    "reception-exterior.jpg",
    "Reception building with a red roof beside the paver drive",
    "Grounds",
  ),
  entry(
    "reception-entrance-path.jpg",
    "Path leading up to the reception entrance",
    "Grounds",
  ),
];

const pool: (GalleryImage | null)[] = [
  entry("pool-main-01.jpg", "Blue swimming pool with palms behind", "Pool"),
  entry(
    "pool-with-kids-pool.jpg",
    "Swimming pool and shallow kids pool on a tiled deck",
    "Pool",
  ),
  entry("pool-deck-kids-pool.jpg", "Pool deck with chairs and the kids pool", "Pool"),
  entry("pool-water-closeup.jpg", "Pool water and tiles with palms behind", "Pool"),
];

const diningShots: (GalleryImage | null)[] = [
  entry(
    "dining-restaurant-entrance.jpg",
    "Restaurant entrance framed by coffee plants",
    "Dining",
  ),
  entry(
    "dining-glasses-detail.jpg",
    "Glasses on a restaurant table with the valley blurred behind",
    "Dining",
  ),
  ...dining.images.map((image): GalleryImage => ({ ...image, category: "Dining" })),
];

const games: (GalleryImage | null)[] = [
  entry(
    "games-table-tennis.jpg",
    "Blue table-tennis table under a roof among trees",
    "Games",
  ),
  entry("games-foosball.jpg", "Foosball table with red and blue players", "Games"),
];

const roomShots: GalleryImage[] = rooms.flatMap((room) =>
  room.images.slice(0, 5).map((image): GalleryImage => ({ ...image, category: "Rooms" })),
);

// TODO: no kids-park photos supplied yet; the "Kids Park" filter appears once some exist.
export const gallery: GalleryImage[] = [
  ...compact(grounds),
  ...compact(pool),
  ...compact(diningShots),
  ...compact(games),
  ...roomShots,
];

export const galleryCategories: GalleryCategory[] = [
  "Rooms",
  "Pool",
  "Dining",
  "Kids Park",
  "Games",
  "Grounds",
].filter((category) =>
  gallery.some((image) => image.category === category),
) as GalleryCategory[];
