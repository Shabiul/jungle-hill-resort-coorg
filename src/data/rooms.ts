import { describeShot, photosFromFolder } from "@/lib/images";
import type { Room } from "@/types";

const RATE_NOTE = "Enquire for rates";
const base = "/images/rooms";

// The brochure says 13 rooms in total.
// TODO: confirm how many rooms of each type; no per-category count is stated, so none is shown.
export const rooms: Room[] = [
  {
    slug: "deluxe-ac-rooms",
    number: "01",
    name: "The Cloudline Suite",
    highlights: ["King bed", "Private balcony", "Air conditioned"],
    category: "Deluxe AC Room",
    categoryShort: "Deluxe AC",
    summary: "A 250 sq ft AC room with a king bed and a private balcony onto the estate.",
    description:
      "The Deluxe AC Room is the resort's premium category. A king bed, a private balcony, air conditioning and a refrigerator, with a coffee kettle and supplies on the tray. Ideal for couples or small families.",
    sizeSqFt: 250,
    bed: "King bed",
    occupancy: "Couples or small families",
    guestNotes: ["An extra mattress can be arranged for one additional guest."],
    amenities: [
      "Private balcony",
      "Attached washroom",
      "Air conditioning",
      "TV",
      "Fan",
      "Refrigerator",
      "Coffee kettle with supplies",
      "Cupboard",
    ],
    // TODO: ask client for room numbers (the brochure gives none for the Deluxe AC rooms).
    locations: [],
    rateNote: RATE_NOTE,
    price: null,
    imageFolder: `${base}/deluxe-ac-rooms`,
    images: photosFromFolder(
      `${base}/deluxe-ac-rooms`,
      [
        ["bedroom-03.jpg", "King bed with headboard lights in a Deluxe AC room"],
        ["bedroom-01.jpg", "Deluxe AC room with king bed, TV unit and sofa"],
        ["bedroom-02.jpg", "Deluxe AC room bed with curtains drawn back"],
        [
          "balcony-01.jpg",
          "Private balcony of a Deluxe AC room looking over trees and green hills",
        ],
        [
          "coffee-kettle-01.jpg",
          "Coffee kettle, water and cups on the tray in a Deluxe AC room",
        ],
        ["bedroom-04.jpg", "Deluxe AC room with seating and a bed in the background"],
        ["bathroom-01.jpg", "Tiled shower area in a Deluxe AC room bathroom"],
        ["bathroom-02.jpg", "Washbasin and toilet in a Deluxe AC room bathroom"],
        [
          "exterior-01.jpg",
          "Two-storey block with balconies and external stairs among tall trees",
        ],
        [
          "exterior-02.jpg",
          "White two-storey room block with balconies above a stone base",
        ],
      ],
      (file) => describeShot(file, "The Cloudline Suite"),
    ),
  },
  {
    slug: "family-ac-room",
    number: "02",
    name: "The Estate House",
    highlights: ["Up to 4 guests", "Two washrooms", "Ground and first floor"],
    category: "Family AC Room",
    categoryShort: "Family AC",
    summary:
      "400 sq ft for up to four guests: two double beds, two washrooms and a seating area.",
    description:
      "The Family AC Room is the largest on the property. Two double beds, two attached washrooms and a cozy seating area, with air conditioning, a TV and a coffee kettle. Family rooms are available on both the ground floor and the first floor.",
    sizeSqFt: 400,
    bed: "Two double beds",
    occupancy: "Up to 4 guests",
    guestNotes: ["An extra mattress is available on request for one additional guest."],
    amenities: [
      "Two attached washrooms",
      "Air conditioning",
      "TV",
      "Fan",
      "Coffee kettle",
      "Cupboard",
      "Cozy seating area",
    ],
    locations: ["Ground floor and first floor"],
    rateNote: RATE_NOTE,
    price: null,
    imageFolder: `${base}/family-ac-room`,
    images: photosFromFolder(
      `${base}/family-ac-room`,
      [
        [
          "bedroom-02.jpg",
          "Family AC Room, first floor: two double beds and a wood-panelled headboard wall",
        ],
        [
          "bedroom-01.jpg",
          "Family AC Room, first floor: two double beds with teal runners",
        ],
        ["bedroom-03.jpg", "Family AC Room, first floor: two beds beyond a long sofa"],
        [
          "bedroom-08.jpg",
          "Family AC Room, first floor: beds under a wood-panelled ceiling",
        ],
        ["bathroom-03.jpg", "Family AC Room, first floor: tiled bathroom with washbasin"],
        [
          "bedroom-04.jpg",
          "Family AC Room, ground floor: two double beds in a spacious room",
        ],
        [
          "seating-01.jpg",
          "Family AC Room, ground floor: seating area with cushioned wooden sofas",
        ],
        ["seating-02.jpg", "Family AC Room, ground floor: wide seating area"],
        [
          "bedroom-05.jpg",
          "Family AC Room, ground floor: beds and TV unit on a stone-textured wall",
        ],
        ["bedroom-06.jpg", "Family AC Room, ground floor: room seen from the doorway"],
        [
          "bedroom-07.jpg",
          "Family AC Room, ground floor: two double beds facing a TV and seating",
        ],
        ["bathroom-01.jpg", "Family AC Room, ground floor: attached bathroom"],
        ["bathroom-02.jpg", "Family AC Room, ground floor: second bathroom"],
      ],
      (file) => describeShot(file, "The Estate House"),
    ),
  },
  {
    slug: "standard-non-ac-cottage",
    number: "03",
    name: "The Pepper Vine Cottage",
    highlights: ["Queen bed", "Separate balcony", "2 adults + infant"],
    category: "Standard Non-AC Cottage",
    categoryShort: "Standard Non-AC Cottage",
    summary:
      "A 150 sq ft cottage for couples, with a queen bed and a balcony of its own.",
    description:
      "The Standard Non-AC Cottage is a 150 sq ft stay for couples. A queen bed, an attached washroom and a separate balcony, with a TV, fan, coffee kettle and cupboard.",
    sizeSqFt: 150,
    bed: "Queen bed",
    occupancy: "Two adults and an infant",
    guestNotes: [],
    amenities: [
      "Separate balcony",
      "Attached washroom",
      "TV",
      "Fan",
      "Coffee kettle",
      "Cupboard",
    ],
    // TODO: ask client for room numbers (the brochure gives none for the cottage).
    locations: [],
    rateNote: RATE_NOTE,
    price: null,
    imageFolder: `${base}/standard-non-ac-cottage`,
    images: photosFromFolder(
      `${base}/standard-non-ac-cottage`,
      [
        [
          "exterior-02.jpg",
          "The Pepper Vine Cottage: the cottage with a red tiled roof among bamboo and coffee plants",
        ],
        [
          "bedroom-01.jpg",
          "The Pepper Vine Cottage: queen bed with a teal runner and grey curtains",
        ],
        [
          "bathroom-01.jpg",
          "The Pepper Vine Cottage: attached bathroom with washbasin and wall tiles",
        ],
        [
          "balcony-01.jpg",
          "The Pepper Vine Cottage: separate wooden balcony with two chairs facing the plantation",
        ],
        [
          "balcony-02.jpg",
          "The Pepper Vine Cottage: balcony with timber railing and a tiled roof beyond",
        ],
        [
          "exterior-01.jpg",
          "The Pepper Vine Cottage: timber balcony and staircase among bamboo",
        ],
        [
          "bedroom-02.jpg",
          "The Pepper Vine Cottage: queen bed under a wood-panelled ceiling",
        ],
        ["bedroom-05.jpg", "The Pepper Vine Cottage: wardrobe, TV and bed"],
        [
          "bedroom-09.jpg",
          "The Pepper Vine Cottage: bedroom seen from the foot of the bed",
        ],
        ["bedroom-10.jpg", "The Pepper Vine Cottage: bed with teal runner and cushions"],
      ],
      (file) => describeShot(file, "The Pepper Vine Cottage"),
    ),
  },
  {
    slug: "standard-non-ac-room",
    number: "04",
    name: "Standard Non-AC Room",
    label: "Non-AC · 150 sq ft · A2, A3, A5, A6",
    highlights: ["Queen bed", "Rooms A2 A3 A5 A6", "2 adults + infant"],
    category: "Standard Non-AC Room",
    categoryShort: "Standard Non-AC",
    summary:
      "A 150 sq ft room for couples with a queen bed. A2, A3 and A5 are upstairs, A6 is on the ground floor.",
    description:
      "The Standard Non-AC Room is 150 sq ft and made for couples. A queen bed, an attached washroom, a TV, a fan, a coffee kettle and a cupboard, with a balcony onto the plantation.",
    sizeSqFt: 150,
    bed: "Queen bed",
    occupancy: "Two adults and an infant",
    guestNotes: [],
    amenities: ["Attached washroom", "TV", "Fan", "Coffee kettle", "Cupboard"],
    locations: ["A2, A3, A5: first floor", "A6: ground floor"],
    rateNote: RATE_NOTE,
    price: null,
    imageFolder: `${base}/standard-non-ac-room`,
    images: photosFromFolder(
      `${base}/standard-non-ac-room`,
      [
        [
          "bedroom-02.jpg",
          "Standard Non-AC Room A3, first floor: queen bed with cream curtains",
        ],
        [
          "bedroom-03.jpg",
          "Standard Non-AC Room A3, first floor: queen bed under a wooden ceiling",
        ],
        [
          "balcony-03.jpg",
          "Standard Non-AC Room A3, first floor: balcony with a blue parapet and seating",
        ],
        [
          "view-02.jpg",
          "Standard Non-AC Room A3, first floor: view over tiled roofs and the valley",
        ],
        ["bedroom-01.jpg", "Standard Non-AC Room A2, first floor: queen bed and TV unit"],
        [
          "entrance-a2.jpg",
          "Standard Non-AC Room A2, first floor: entrance with a chair outside the door",
        ],
        [
          "balcony-07.jpg",
          "Standard Non-AC Room A2, first floor: balcony outside the door",
        ],
        [
          "bedroom-04.jpg",
          "Standard Non-AC Room A5, first floor: queen bed with blue cushions facing the TV",
        ],
        ["bedroom-05.jpg", "Standard Non-AC Room A5, first floor: bed and wardrobe"],
        [
          "bedroom-06.jpg",
          "Standard Non-AC Room A5, first floor: bed beside the TV unit",
        ],
        [
          "balcony-04.jpg",
          "Standard Non-AC Room A5, first floor: balcony with chairs beside the room door",
        ],
        [
          "view-01.jpg",
          "Standard Non-AC Room A5, first floor: coffee plants and misty hills over the balcony rail",
        ],
        [
          "bedroom-07.jpg",
          "Standard Non-AC Room A6, ground floor: queen bed with a teal runner",
        ],
        ["bedroom-08.jpg", "Standard Non-AC Room A6, ground floor: bed, desk and kettle"],
        [
          "entrance-a6.jpg",
          "Standard Non-AC Room A6, ground floor: entrance with two chairs on a stone floor",
        ],
        [
          "balcony-09.jpg",
          "Standard Non-AC Room A6, ground floor: stone verandah with chairs and a bamboo blind",
        ],
        [
          "bathroom-01.jpg",
          "Standard Non-AC Room A6, ground floor: bathroom with patterned tiles",
        ],
        [
          "balcony-01.jpg",
          "Standard Non-AC Room, first floor: balcony with two chairs and a low table",
        ],
        [
          "balcony-02.jpg",
          "Standard Non-AC Room, first floor: timber balcony looking into the trees",
        ],
        [
          "balcony-05.jpg",
          "Standard Non-AC Room, first floor: balcony seating with a view of the hills",
        ],
      ],
      (file) => describeShot(file, "Standard Non-AC Room"),
    ),
  },
];

/** "Name, Category", or just the name when the two are the same. */
export function roomTitle(room: Pick<Room, "name" | "category">) {
  return room.name === room.category ? room.name : `${room.name}, ${room.category}`;
}

/** Mono label under a stay's name. */
export function roomLabel(room: Pick<Room, "label" | "categoryShort" | "sizeSqFt">) {
  return room.label ?? `${room.categoryShort} · ${room.sizeSqFt} sq ft`;
}

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
