import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import { EnquiryWizard } from "@/components/forms/EnquiryWizard";
import { BentoGallery } from "@/components/shared/BentoGallery";
import { GlassPanel } from "@/components/ui/GlassPanel";
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
    title: room ? `${room.name}, ${room.category}` : "Stay",
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
          <p className="label-mono text-steel">
            <Link href="/rooms" className="link-underline">
              Stays
            </Link>{" "}
            — {room.number}
          </p>
          <RevealText
            as="h1"
            immediate
            lines={[{ text: room.name }]}
            className="mt-4 text-h1"
          />
          <p className="label-mono mt-3 text-steel">
            {room.category} · {room.sizeSqFt} sq ft
          </p>

          <div className="mt-6">
            <BentoGallery
              images={room.images}
              overlay={
                <GlassPanel className="dark-surface pointer-events-auto grid max-w-md gap-x-6 gap-y-2 bg-night/55 p-4 sm:grid-cols-2">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <p className="label-mono text-[0.6rem] text-pearl/75">
                        {fact.label}
                      </p>
                      <p className="font-display text-lg leading-tight">{fact.value}</p>
                    </div>
                  ))}
                </GlassPanel>
              }
            />
          </div>
        </div>
      </section>

      <section aria-label="About this stay" className="section-space">
        <div className="page-container grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label-mono text-steel">About this stay</p>
            <p className="mt-3 font-display text-h3">{room.summary}</p>
            <p className="mt-4 max-w-[58ch] text-steel">{room.description}</p>
            {room.guestNotes.map((note) => (
              <p
                key={note}
                className="mt-3 max-w-[58ch] border-l-2 border-champagne pl-4"
              >
                {note}
              </p>
            ))}

            <h2 className="label-mono mt-8 text-steel">In the stay</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {room.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-[2px] border border-night/20 px-3 py-3 text-small"
                >
                  {amenity}
                </li>
              ))}
            </ul>

            <h2 className="label-mono mt-8 text-steel">House policies</h2>
            <ul className="mt-3 space-y-2 text-small text-steel">
              <li>
                Check-in {checkTimes.checkIn} · Check-out {checkTimes.checkOut}.{" "}
                {checkTimes.note}
              </li>
              <li>ID proof is mandatory. Visitors are not allowed.</li>
              <li>No loud music or parties. Outside food is not permitted.</li>
            </ul>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="dark-surface rounded-[2px] border border-champagne/30 bg-slate p-5 text-pearl lg:sticky lg:top-24">
              <p className="label-mono text-champagne-soft">{room.rateNote}</p>
              <p className="mt-2 font-display text-h4">{room.name}</p>
              <div className="mt-4 flex flex-col gap-3">
                <a href="#enquire" className="btn btn-primary">
                  Enquire about this stay
                </a>
                <a
                  href={whatsappLink(enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline gap-2"
                >
                  <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />{" "}
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="enquire"
        aria-label={`Enquire about ${room.name}`}
        className="section-space scroll-mt-20 bg-vapour"
      >
        <div className="page-container">
          <p className="label-mono text-steel">Enquire</p>
          <h2 className="mt-3 mb-6 text-h2">
            Ask about <em className="font-light text-steel">{room.name}.</em>
          </h2>
          <Suspense fallback={<p className="text-steel">Loading the form…</p>}>
            <EnquiryWizard defaultStay={room.slug} />
          </Suspense>
        </div>
      </section>

      <nav
        aria-label="Other stays"
        className="page-container grid gap-6 py-[var(--space-section)] sm:grid-cols-2"
      >
        <Link
          href={`/rooms/${previous.slug}`}
          className="group border-t border-night/25 pt-5"
        >
          <span className="label-mono flex items-center gap-2 text-steel">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> Previous
          </span>
          <span className="mt-2 block font-display text-h4 group-hover:underline">
            {previous.name}
          </span>
        </Link>
        <Link
          href={`/rooms/${next.slug}`}
          className="group border-t border-night/25 pt-5 sm:text-right"
        >
          <span className="label-mono flex items-center gap-2 text-steel sm:justify-end">
            Next <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="mt-2 block font-display text-h4 group-hover:underline">
            {next.name}
          </span>
        </Link>
      </nav>
    </>
  );
}
