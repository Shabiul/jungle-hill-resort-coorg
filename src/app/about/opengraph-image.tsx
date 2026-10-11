import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "A retreat in the coffee estate";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage("A retreat in the coffee estate", "/images/hero/hero-b-coffee-view.jpg");
}
