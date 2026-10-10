import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import { CTA } from "@/components/sections/CTA";
import { Photo } from "@/components/shared/Photo";
import { PhotoCarousel } from "@/components/shared/PhotoCarousel";
import { checkTimes } from "@/data/policies";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { whatsappLink } from "@/lib/contact";
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
    image: room?.images[0]?.src,
  });
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const index = rooms.findIndex((item) => item.slug === slug);
  const previous = rooms[(index - 1 + rooms.length) % rooms.length];
  const next = rooms[(index + 1) % rooms.length];
  const enquiry = `Hello Jungle Hill Resort, I would like to enquire about ${room.name} (${room.category}).`;

  const facts = [
    { label: "Size", value: `${room.sizeSqFt} sq ft` },
    { label: "Bed", value: room.bed },
    { label: "Sleeps", value: room.occupancy },
    ...(room.locations.length
      ? [{ label: "Where", value: room.locations.join(" · ") }]
      : []),
    { label: "Rates", value: room.rateNote },
  ];

  return (
    <>
      <section aria-label={room.name} className="pt-28 sm:pt-32">
        <div className="page-container">
          <p className="label-mono text-emerald">
            <Link href="/rooms" className="link-underline">
              Stays
            </Link>{" "}
            / {room.number}
          </p>
          <RevealText
            as="h1"
            immediate
            lines={[{ text: room.name }]}
            className="mt-5 text-h1"
          />
          <p className="label-mono mt-4 text-stone">
            {room.category} · {room.sizeSqFt} sq ft
          </p>
        </div>

        <div className="page-container mt-6">
          <div className="dark-surface relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/8]">
            <Photo
              image={room.images[0]}
              fill
              priority
              sizes="(min-width: 1344px) 1280px, 100vw"
            />
            <dl className="glass absolute right-3 bottom-3 left-3 grid gap-x-8 gap-y-3 p-4 sm:right-auto sm:bottom-6 sm:left-6 sm:grid-cols-2 sm:p-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="label-mono text-[0.65rem] text-ivory/80">
                    {fact.label}
                  </dt>
                  <dd className="font-display text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="About this stay" className="section-space">
        <div className="page-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label-mono text-emerald">About this stay</p>
            <p className="mt-4 font-display text-h3">{room.summary}</p>
            <p className="mt-4 max-w-xl text-stone">{room.description}</p>
            {room.guestNotes.map((note) => (
              <p key={note} className="mt-4 max-w-xl border-l-2 border-brass pl-4">
                {note}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/booking?room=${room.slug}`} className="btn btn-primary">
                Enquire about this room
              </Link>
              <a
                href={whatsappLink(enquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline gap-2"
              >
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="label-mono !font-mono text-xs text-emerald">In the room</h2>
            <ul className="mt-4 border-t border-ink">
              {room.amenities.map((amenity) => (
                <li key={amenity} className="border-b border-ink/20 py-3">
                  {amenity}
                </li>
              ))}
            </ul>
            <h2 className="label-mono mt-6 !font-mono text-xs text-emerald">
              House policies
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-stone">
              <li>
                Check-in {checkTimes.checkIn} · Check-out {checkTimes.checkOut}.{" "}
                {checkTimes.note}
              </li>
              <li>ID proof is mandatory. Visitors are not allowed.</li>
              <li>No loud music or parties. Outside food is not permitted.</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Photographs" className="section-space bg-linen">
        <div className="page-container">
          <p className="label-mono text-emerald">Photographs</p>
          <h2 className="mt-4 mb-10 text-h3">Every photograph</h2>
          <PhotoCarousel images={room.images} />
        </div>
      </section>

      <nav
        aria-label="Other stays"
        className="page-container section-space grid gap-6 sm:grid-cols-2"
      >
        <Link
          href={`/rooms/${previous.slug}`}
          className="group border-t border-ink/25 pt-6"
        >
          <span className="label-mono flex items-center gap-2 text-stone">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> Previous
          </span>
          <span className="mt-2 block font-display text-3xl group-hover:underline">
            {previous.name}
          </span>
        </Link>
        <Link
          href={`/rooms/${next.slug}`}
          className="group border-t border-ink/25 pt-6 sm:text-right"
        >
          <span className="label-mono flex items-center gap-2 text-stone sm:justify-end">
            Next <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="mt-2 block font-display text-3xl group-hover:underline">
            {next.name}
          </span>
        </Link>
      </nav>

      <CTA />
    </>
  );
}
