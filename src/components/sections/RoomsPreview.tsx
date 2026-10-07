import { HorizontalRooms } from "@/components/sections/HorizontalRooms";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { rooms } from "@/data/rooms";

export function RoomsPreview() {
  return (
    <section id="rooms" aria-label="Rooms">
      <div className="section-space bg-linen pb-12 lg:pb-16">
        <div className="page-container flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            label="02 / Rooms · 13 rooms · 4 stays"
            lines={[{ text: "Four ways" }, { text: "to ", emphasis: "stay." }]}
          />
          <p className="max-w-sm lg:pb-3">
            Rates depend on dates and category, so there are no prices on this page. Ask
            us and we will reply with what is available.
          </p>
        </div>
      </div>
      <HorizontalRooms rooms={rooms} />
    </section>
  );
}
