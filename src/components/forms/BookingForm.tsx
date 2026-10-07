"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { bookingSchema, type BookingValues } from "@/lib/validations";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) });

  async function onSubmit(values: BookingValues) {
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  // TODO: design, remaining fields and success/error states
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input label="Name" error={errors.name?.message} {...register("name")} />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
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
      <Input
        label="Phone"
        type="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Input
        label="Guests"
        type="number"
        error={errors.guests?.message}
        {...register("guests", { valueAsNumber: true })}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
      {status === "sent" && <p role="status">Sent.</p>}
      {status === "error" && <p role="alert">Something went wrong.</p>}
    </form>
  );
}
