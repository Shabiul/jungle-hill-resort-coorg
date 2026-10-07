"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const fieldClass =
  "mt-1 block w-full min-h-11 border-b border-ivory/40 bg-transparent px-0 py-1 text-ivory [color-scheme:dark] focus:border-brass-soft focus:outline-none";

/** Glass enquiry bar docked in the hero. Sends the values to /booking, prefilled. */
export function HeroEnquiryBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Check availability"
      className="glass grid gap-5 p-5 backdrop-blur-xl sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_0.6fr_auto] lg:items-end"
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
          className={`${fieldClass} [&>option]:text-ink`}
        >
          {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn-primary gap-2 sm:col-span-2 lg:col-span-1">
        Check availability
        <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <p className="text-sm text-ivory/80 sm:col-span-2 lg:col-span-4">
        No online booking yet. We reply with availability and rates.
      </p>
    </form>
  );
}
