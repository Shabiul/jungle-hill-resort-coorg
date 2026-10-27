import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please write a few more words"),
});

export type ContactValues = z.infer<typeof contactSchema>;
