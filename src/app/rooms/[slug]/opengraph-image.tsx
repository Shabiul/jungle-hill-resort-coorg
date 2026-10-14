import { getRoomBySlug, roomTitle } from "@/data/rooms";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Jungle Hill Resort room";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  return ogImage(room ? roomTitle(room) : "Stays", room?.images[0]?.src);
}
