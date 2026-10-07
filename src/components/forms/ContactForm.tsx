"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
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
    try {
      const res = await fetch("/api/contact", {
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
      <Textarea
        label="Message"
        error={errors.message?.message}
        {...register("message")}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
      {status === "sent" && <p role="status">Sent.</p>}
      {status === "error" && <p role="alert">Something went wrong.</p>}
    </form>
  );
}
