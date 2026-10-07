"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const fieldClass =
  "mt-1 block w-full min-h-11 border-b border-paper/40 bg-transparent px-0 py-1 text-paper [color-scheme:dark] placeholder:text-paper/60 focus:border-paper focus:outline-none";

/** Glass enquiry bar over the hero. Opens WhatsApp with a prefilled message. */
export function HeroEnquiryBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = ["Hello Jungle Hill Resort, I would like to enquire about a stay."];
    if (checkIn) lines.push(`Check-in: ${checkIn}`);
    if (checkOut) lines.push(`Check-out: ${checkOut}`);
    lines.push(`Guests: ${guests}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Quick enquiry"
      className="glass grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_0.7fr_auto] lg:items-end"
    >
      <label className="label-mono block">
        Check-in
        <input
          type="date"
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="label-mono block">
        Check-out
        <input
          type="date"
          value={checkOut}
          min={checkIn || undefined}
          onChange={(event) => setCheckOut(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="label-mono block">
        Guests
        <select
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          className={`${fieldClass} [&>option]:text-forest-950`}
        >
          {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
        <button type="submit" className="btn btn-primary gap-2">
          <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
          Enquire on WhatsApp
        </button>
      </div>
      <p className="text-sm text-paper/80 sm:col-span-2 lg:col-span-4">
        No online booking yet. We reply with availability and rates.{" "}
        <Link href="/booking" className="link-underline text-paper">
          Use the full enquiry form
        </Link>
      </p>
    </form>
  );
}
