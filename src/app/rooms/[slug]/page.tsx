import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { buildMetadata } from "@/lib/metadata";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  return buildMetadata({
    title: room?.name ?? "Room",
    description: room?.summary,
    path: `/rooms/${slug}`,
  });
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return <PagePlaceholder title={room.name} />;
}
