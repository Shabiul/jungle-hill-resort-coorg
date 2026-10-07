import { photos } from "@/lib/images";
import type { DiningInfo } from "@/types";

export const dining: DiningInfo = {
  cuisines: ["South Indian", "North Indian", "Chinese"],
  hours: "7:00 AM to 10:00 PM",
  meals: [
    { name: "Breakfast", time: "8:00 to 10:00 AM" },
    { name: "Lunch", time: "12:00 to 3:00 PM" },
    { name: "Evening snacks, tea and coffee", time: "3:00 to 7:00 PM" },
    { name: "Dinner", time: "7:00 to 10:00 PM" },
  ],
  guidelines: [
    "Please place orders 30 to 40 minutes in advance.",
    "Last order is at 9:30 PM.",
    "Outside food is not permitted in the restaurant or on the property.",
    "Alcohol is not allowed in the restaurant or common areas. Guests may have it on their own balcony only.",
  ],
  images: photos("/images/dining", [
    [
      "restaurant-hall-01.jpg",
      "Restaurant hall with dark wood tables and a view into the plantation",
    ],
    [
      "restaurant-hall-02.jpg",
      "Restaurant seating under a high timber roof with bamboo blinds",
    ],
  ]),
};
