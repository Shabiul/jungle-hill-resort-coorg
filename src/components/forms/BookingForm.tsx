"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { rooms } from "@/data/rooms";
import { whatsappLink } from "@/lib/contact";
import { bookingSchema, type BookingValues } from "@/lib/validations";

type Status = "idle" | "sent" | "error";

function summary(values: BookingValues) {
  const room =
    rooms.find((item) => item.slug === values.roomType)?.name ?? "No preference";
  const lines = ["Hello Jungle Hill Resort, I would like to enquire about a stay."];
  if (values.name) lines.push(`Name: ${values.name}`);
  if (values.phone) lines.push(`Phone: ${values.phone}`);
  if (values.checkIn) lines.push(`Check-in: ${values.checkIn}`);
  if (values.checkOut) lines.push(`Check-out: ${values.checkOut}`);
  lines.push(
    `Guests: ${values.adults || 0} adults, ${values.children || 0} children, ${values.infants || 0} infants`,
  );
  lines.push(`Room: ${room}`);
  if (values.message) lines.push(`Message: ${values.message}`);
  return lines.join("\n");
}

/** Enquiry form (no booking engine yet). Posts to /api/enquiry or hands off to WhatsApp. */
export function BookingForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");

  const guests = Number(params.get("guests"));
  const roomParam = params.get("room");

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      checkIn: params.get("checkIn") ?? "",
      checkOut: params.get("checkOut") ?? "",
      adults: guests > 0 ? guests : 2,
      children: 0,
      infants: 0,
      roomType: rooms.some((room) => room.slug === roomParam)
        ? (roomParam as string)
        : "any",
      message: "",
    },
  });

  async function onSubmit(values: BookingValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  function sendOnWhatsApp() {
    window.open(whatsappLink(summary(getValues())), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-8"
      aria-label="Stay enquiry"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <Input
          label="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>
      <Input
        label="Email (optional)"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="grid gap-8 sm:grid-cols-2">
        <Input
          label="Check-in"
          type="date"
          error={errors.checkIn?.message}
          {...register("checkIn")}
        />
        <Input
          label="Check-out"
          type="date"
          error={errors.checkOut?.message}
          {...register("checkOut")}
        />
      </div>
      <fieldset>
        <legend className="label-mono text-ink">Guests</legend>
        <div className="mt-1 grid gap-8 sm:grid-cols-3">
          <Input
            label="Adults"
            type="number"
            min={1}
            inputMode="numeric"
            error={errors.adults?.message}
            {...register("adults", { valueAsNumber: true })}
          />
          <Input
            label="Children"
            type="number"
            min={0}
            inputMode="numeric"
            error={errors.children?.message}
            {...register("children", { valueAsNumber: true })}
          />
          <Input
            label="Infants"
            type="number"
            min={0}
            inputMode="numeric"
            error={errors.infants?.message}
            {...register("infants", { valueAsNumber: true })}
          />
        </div>
        <p className="mt-3 text-sm text-stone">
          Standard rooms and cottages take two adults and an infant. In Deluxe and Family
          rooms an extra mattress can be arranged on request for one additional guest.
        </p>
      </fieldset>
      <Select
        label="Room type"
        error={errors.roomType?.message}
        {...register("roomType")}
      >
        <option value="any">No preference</option>
        {rooms.map((room) => (
          <option key={room.slug} value={room.slug}>
            {room.name}
          </option>
        ))}
      </Select>
      <Textarea label="Message (optional)" {...register("message")} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:opacity-60"
        >
          {isSubmitting ? "Sending" : "Send enquiry"}
        </button>
        <button type="button" onClick={sendOnWhatsApp} className="btn btn-outline gap-2">
          <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
          Send on WhatsApp
        </button>
      </div>

      <div aria-live="polite">
        {status === "sent" && (
          <p className="border-l-2 border-brass pl-4">
            Thank you. Your enquiry is in. We will reply with availability and rates. For
            a faster answer, send the same details on WhatsApp.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="border-l-2 border-ink pl-4">
            That did not go through. Please try again, or use WhatsApp or call us.
          </p>
        )}
      </div>
    </form>
  );
}
