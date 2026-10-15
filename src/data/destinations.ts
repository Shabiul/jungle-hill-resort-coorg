import { photo } from "@/lib/images";
import type { ImageAsset } from "@/types";

export type DestinationImage = ImageAsset & { objectPosition?: string };

export interface Destination {
  id: string;
  name: string;
  /** Approximate distance from the resort, in km, from the resort's guide. */
  distanceKm: number;
  /** Two or three sentences, written from the guide's facts. */
  description: string;
  /** A few short facts shown as small tags. */
  facts: string[];
  /**
   * Optional photo. Add files to public/images/destinations/ and set this to show one on the card;
   * cards without it are typography only.
   */
  image?: DestinationImage;
}

export type DistanceBand = "nearby" | "day-trips" | "far";

export interface DistanceFilter {
  id: "all" | DistanceBand;
  label: string;
  /** Inclusive km range; the "all" filter has none. */
  range?: [number, number];
}

export const distanceFilters: DistanceFilter[] = [
  { id: "all", label: "All" },
  { id: "nearby", label: "Nearby up to 11 km", range: [0, 11] },
  { id: "day-trips", label: "Day trips 26 to 44 km", range: [26, 44] },
  { id: "far", label: "Far 72 to 80 km", range: [72, 80] },
];

export function bandOf(distanceKm: number): DistanceBand {
  if (distanceKm <= 11) return "nearby";
  if (distanceKm <= 44) return "day-trips";
  return "far";
}

export const destinationsNote = "Distances are approximate and taken from the resort's guide.";

export const destinationsIntro =
  "Coorg is a place of waterfalls, forts, temples, rivers and forest. These are the places guests most often visit from Jungle Hill Resort, grouped by how far they are from us, from a short drive into Madikeri to a full day out.";

export function mapsSearchUrl(name: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, Coorg`)}`;
}

/** Photo from public/images/destinations/{slug}.webp, or undefined so the card stays typography-only. */
function destinationImage(
  slug: string,
  alt: string,
  objectPosition?: string,
): DestinationImage | undefined {
  const image = photo(`/images/destinations/${slug}.webp`, alt);
  return image ? { ...image, objectPosition } : undefined;
}

export const destinations: Destination[] = [
  {
    id: "sunny-side",
    image: destinationImage("sunny-side", "General Thimayya Museum entrance sign at Sunny Side, Madikeri, Coorg", "50% 40%"),
    name: "Sunny Side",
    distanceKm: 5,
    description:
      "A memorial museum that tells the life story of General Thimayya. A statue of the General in uniform stands at the entrance, and the museum also shows a showcase of Indian military history.",
    facts: ["Memorial museum", "Statue at the entrance", "Indian military history"],
  },
  {
    id: "omkareshwara-temple",
    image: destinationImage("omkareshwara-temple", "Omkareshwara Temple shrine in its pond, Madikeri, Coorg", "50% 45%"),
    name: "Omkareshwara Temple",
    distanceKm: 5,
    description:
      "Built by Lingarajendra in 1820, this temple is unusual for combining Islamic and Gothic styles. A local legend tells of a Brahmin and a Shivalinga brought from Kashi.",
    facts: ["Built in 1820", "Islamic and Gothic style", "Shivalinga from Kashi (legend)"],
  },
  {
    id: "rajas-seat",
    image: destinationImage("rajas-seat", "Sunset over misty mountains seen from Raja's Seat, Madikeri, Coorg", "50% 35%"),
    name: "Raja's Seat",
    distanceKm: 5,
    description:
      "One of Madikeri's best-known places. A square structure with four arched entrances stands in a garden where the kings of Kodagu once watched the sunset, with views of misty mountains.",
    facts: ["Garden with arched entrances", "Misty mountain views", "Toy train for children"],
  },
  {
    id: "madikeri-fort",
    image: destinationImage("madikeri-fort", "Madikeri Fort walls and palace buildings, Coorg", "50% 50%"),
    name: "Madikeri Fort",
    distanceKm: 5,
    description:
      "Built by Muddu Raja in the second half of the 17th century and renovated by Tipu Sultan in 1790, who named it Jaffarabad. Inside are the Deputy Commissioner's office, a Ganesha temple, a chapel, the district prison and a museum.",
    facts: ["17th century", "Renovated in 1790", "Museum, temple and chapel"],
  },
  {
    id: "abbey-falls",
    image: destinationImage("abbey-falls", "Abbey Falls near Madikeri, Coorg", "50% 35%"),
    name: "Abbey Falls",
    distanceKm: 11,
    description:
      "A waterfall set amid coffee and cardamom plantations, best visited after the monsoon. A hanging bridge stands in front of the falls.",
    facts: ["Coffee and cardamom plantations", "Best after the monsoon", "Hanging bridge"],
  },
  {
    id: "mandalpatti",
    image: destinationImage("mandalpatti", "Green hills and drifting cloud at Mandalpatti, Coorg", "50% 50%"),
    name: "Mandalpatti",
    distanceKm: 26,
    description:
      "A viewpoint at about 4050 ft inside the Pushpagiri reserve forest, reached by a four-by-four jeep drive to the top. Locals call it Mugilu-Pete, the market of cloud and mist.",
    facts: ["About 4050 ft", "Four-by-four jeep drive", "Pushpagiri reserve forest"],
  },
  {
    id: "chiklihole-dam",
    image: destinationImage("chiklihole-dam", "Water spilling at Chiklihole Dam near Madikeri, Coorg", "50% 60%"),
    name: "Chiklihole Dam",
    distanceKm: 29,
    description:
      "A dam on a tributary of the Cauvery, between Madikeri and Kushalnagar. It is a quiet place, away from the crowd.",
    facts: ["Between Madikeri and Kushalnagar", "Cauvery tributary", "Away from the crowd"],
  },
  {
    id: "cauvery-nisargadhama",
    image: destinationImage("cauvery-nisargadhama", "The Cauvery river under trees at Cauvery Nisargadhama, Coorg", "50% 50%"),
    name: "Cauvery Nisargadhama",
    distanceKm: 32,
    description:
      "A 35-acre island formed by the Cauvery, with bamboo groves, sandalwood and teak. A hanging rope bridge leads across, and the island has an orchidarium, tree-top shelters, pedal boating, elephant riding and a deer park.",
    facts: ["35-acre river island", "Hanging rope bridge", "Orchidarium and deer park", "Pedal boating"],
  },
  {
    id: "cheluvara-falls",
    image: destinationImage("cheluvara-falls", "Cheluvara Falls pouring into a clear pool near Cheyyandane, Coorg", "35% 40%"),
    name: "Cheluvara Falls",
    distanceKm: 33,
    description:
      "Near Cheyyandane village on the Virajpet to Talacauvery road, a tributary of the Kaveri drops about 150 ft into a pool. It is known locally as Embepare.",
    facts: ["About 150 ft drop", "Locally called Embepare", "Near Cheyyandane village"],
  },
  {
    id: "bagamandala",
    image: destinationImage("bagamandala", "Temple beside the water at Bagamandala, Coorg", "50% 30%"),
    name: "Bagamandala",
    distanceKm: 36,
    description:
      "The meeting point of the Cauvery, the Kannike and the Sujyothi. The Sri Bhagandeshwara temple here is built in the Kerala style, alongside four temples to Lord Shiva, Subrahmanya, Mahavishnu and Ganapathi.",
    facts: ["Three rivers meet", "Kerala-style temple", "Four more temples"],
  },
  {
    id: "golden-temple-bylakuppe",
    image: destinationImage("golden-temple-bylakuppe", "Golden Temple (Namdroling Monastery) at Bylakuppe near Kushalnagar, Coorg", "50% 40%"),
    name: "Golden Temple (Bylakuppe)",
    distanceKm: 39,
    description:
      "A Tibetan Buddhist temple near Kushalnagar, in the Tibetan settlement established in 1972, the second largest in India. The main shrine is 40 ft tall and holds idols of Guru Padmasambhava, Buddha Sakyamuni and Amitayus.",
    facts: ["Tibetan settlement from 1972", "40 ft main shrine", "Near Kushalnagar"],
  },
  {
    id: "harangi-dam",
    image: destinationImage("harangi-dam", "Harangi Dam with water released through its gates, Coorg", "50% 50%"),
    name: "Harangi Dam",
    distanceKm: 40,
    description:
      "A masonry dam across the Harangi, a tributary of the Kaveri, in Somwarpet taluk about 9 km from Kushalnagar. There is a garden area beside it.",
    facts: ["Somwarpet taluk", "About 9 km from Kushalnagar", "Garden area"],
  },
  {
    id: "dubare-elephant-camp",
    image: destinationImage("dubare-elephant-camp", "Elephant in the forest at Dubare Elephant Camp, Coorg", "75% 45%"),
    name: "Dubare Elephant Camp",
    distanceKm: 41,
    description:
      "On the banks of the Cauvery, reached by a boat ride across the river. Visitors can watch elephant bathing, and the camp offers elephant rides and river rafting.",
    facts: ["Boat ride across the river", "Elephant bathing", "River rafting"],
  },
  {
    id: "talacauvery",
    image: destinationImage("talacauvery", "Holy tank and steps at Talacauvery, birthplace of the Cauvery, Coorg", "50% 70%"),
    name: "Talacauvery",
    distanceKm: 44,
    description:
      "The birthplace of the Cauvery, in the Brahmagiri hills at 1276 m. A holy tank and a temple mark the spot, and there are views from the Brahmagiri peak.",
    facts: ["Source of the Cauvery", "1276 m, Brahmagiri hills", "Holy tank and temple"],
  },
  {
    id: "iruppu-falls",
    image: destinationImage("iruppu-falls", "Iruppu Falls tumbling through forest in the Brahmagiri hills, Coorg", "50% 45%"),
    name: "Iruppu Falls",
    distanceKm: 72,
    description:
      "In the Brahmagiri hills between Srimangal and Kutta in South Coorg, the water falls from about 170 ft amid thick forest. The falls are formed by the Lakshmana Teertha.",
    facts: ["About 170 ft", "South Coorg", "Thick forest"],
  },
  {
    id: "nagarahole",
    image: destinationImage("nagarahole", "Spotted deer grazing beside a lake at Nagarahole, Coorg", "50% 60%"),
    name: "Nagarahole Wildlife Sanctuary",
    distanceKm: 80,
    description:
      "Also known as Rajiv Gandhi National Park, home to tigers, Indian bison and elephants. It was declared a tiger reserve in 1999.",
    facts: ["Rajiv Gandhi National Park", "Tigers, bison and elephants", "Tiger reserve since 1999"],
  },
];
