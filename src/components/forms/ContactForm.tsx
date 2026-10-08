"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, type ContactValues } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-8"
      aria-label="Contact us"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <Input
          label="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <Input
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Textarea
        label="Message"
        error={errors.message?.message}
        {...register("message")}
      />
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:opacity-60"
        >
          {isSubmitting ? "Sending" : "Send message"}
        </button>
      </div>
      <div aria-live="polite">
        {status === "sent" && (
          <p className="border-l-2 border-brass pl-4">Thank you. We will be in touch.</p>
        )}
        {status === "error" && (
          <p role="alert" className="border-l-2 border-ink pl-4">
            That did not go through. Please try again or call us.
          </p>
        )}
      </div>
    </form>
  );
}
