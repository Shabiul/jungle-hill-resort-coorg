import type { PolicyItem } from "@/types";

export const houseRules: PolicyItem[] = [
  {
    title: "A quiet place",
    text: "Please keep the evenings calm: no loud music or loud sounds after 10:00 PM. The resort is for rest.",
  },
  {
    title: "Visitors",
    text: "Visitors are not allowed after 8:30 PM, so the evenings stay peaceful for our guests.",
  },
  {
    title: "ID on arrival",
    text: "Valid ID proof is mandatory for every guest at check-in.",
  },
  {
    title: "Your own table",
    text: "Outside food is not permitted in the restaurant or on the property.",
  },
  {
    title: "Alcohol",
    text: "Not in the restaurant or common areas. Guests may have it on their own balcony only.",
  },
  {
    title: "Pool dress code",
    text: "Swimwear or nylon dresses only, no cotton. No food or drinks in the pool area, and no smoking.",
  },
];

export const checkTimes = {
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  note: "Early check-in or late check-out is chargeable and subject to availability.",
};
