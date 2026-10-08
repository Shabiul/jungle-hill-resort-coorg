import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name");
const email = z.email("Please enter a valid email");
const phone = z.string().trim().min(7, "Please enter a valid phone number");
const count = (min: number, max: number, message: string) =>
  z.number({ error: message }).int(message).min(min, message).max(max, message);

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

export const bookingSchema = z
  .object({
    name,
    phone,
    email: z.union([z.literal(""), email]).optional(),
    checkIn: z.string().min(1, "Select a check-in date"),
    checkOut: z.string().min(1, "Select a check-out date"),
    adults: count(1, 12, "At least 1 adult"),
    children: count(0, 12, "Enter 0 or more"),
    infants: count(0, 6, "Enter 0 or more"),
    roomType: z.string().min(1),
    message: z.string().trim().optional(),
  })
  .refine(
    (value) => !value.checkIn || !value.checkOut || value.checkOut > value.checkIn,
    {
      path: ["checkOut"],
      message: "Check-out must be after check-in",
    },
  );

export type ContactValues = z.infer<typeof contactSchema>;
export type EnquiryValues = z.infer<typeof enquirySchema>;
export type BookingValues = z.infer<typeof bookingSchema>;
