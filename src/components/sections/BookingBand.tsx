"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const field =
  "mt-1 block w-full min-h-11 rounded-[6px] border border-ivory-line bg-ivory-card px-3 py-2 text-base text-ivory-ink focus:border-burgundy focus:outline-none";

/** Burgundy band (the second accent-filled band) with a small availability form that opens /contact prefilled. */
export function BookingBand() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    router.push(`/contact?${params.toString()}`);
  }

  return (
    <section
      id="booking"
      aria-label="Ask about your dates"
      className="section-space relative isolate overflow-hidden bg-burgundy text-ivory"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -top-4 -left-4 -z-0 h-32 w-32 text-olive opacity-40"
      >
        <path
          d="M10 110 C 20 60 60 20 110 10 C 100 60 60 100 10 110 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -right-4 -bottom-4 h-32 w-32 rotate-180 text-olive opacity-40"
      >
        <path
          d="M10 110 C 20 60 60 20 110 10 C 100 60 60 100 10 110 Z"
          fill="currentColor"
        />
      </svg>

      <div className="page-container relative">
        <p className="label-mono text-ivory">Your escape awaits</p>
        <h2 className="mt-3 text-h2 text-ivory">
          Ask us about <em className="font-light italic">your dates.</em>
        </h2>

        <form
          onSubmit={submit}
          aria-label="Check availability"
          className="shadow-soft mt-6 grid gap-4 rounded-[6px] bg-ivory-card p-4 text-ivory-ink sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.6fr_auto] lg:items-end"
        >
          <label className="label-mono block">
            Check-in
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={field}
            />
          </label>
          <label className="label-mono block">
            Check-out
            <input
              type="date"
              value={checkOut}
              min={checkIn || undefined}
              onChange={(e) => setCheckOut(e.target.value)}
              className={field}
            />
          </label>
          <label className="label-mono block">
            Guests
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={field}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-primary gap-2">
            Check Availability{" "}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
