import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name");
const email = z.email("Please enter a valid email");
const phone = z.string().trim().min(7, "Please enter a valid phone number");

export const contactSchema = z.object({
  name,
  email,
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please write a few more words"),
});

export const enquirySchema = z.object({
  name,
  email,
  phone,
  message: z.string().trim().optional(),
});

export const bookingSchema = z.object({
  name,
  email,
  phone,
  checkIn: z.string().min(1, "Select a check-in date"),
  checkOut: z.string().min(1, "Select a check-out date"),
  guests: z.number().int().min(1).max(20),
  roomSlug: z.string().optional(),
  notes: z.string().trim().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type EnquiryValues = z.infer<typeof enquirySchema>;
export type BookingValues = z.infer<typeof bookingSchema>;
