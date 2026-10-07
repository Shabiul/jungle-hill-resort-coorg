"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { enquirySchema, type EnquiryValues } from "@/lib/validations";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema) });

  async function onSubmit(values: EnquiryValues) {
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
        label="Phone"
        type="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
      {status === "sent" && <p role="status">Sent.</p>}
      {status === "error" && <p role="alert">Something went wrong.</p>}
    </form>
  );
}
