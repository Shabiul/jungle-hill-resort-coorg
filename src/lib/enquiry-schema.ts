import { z } from "zod";

export const OCCASIONS = [
  "Holiday",
  "Honeymoon",
  "Family trip",
  "Friends trip",
  "Other",
] as const;

const count = (min: number, max: number, message: string) =>
  z.number({ error: message }).int(message).min(min, message).max(max, message);

/** Indian mobile number, with or without +91. */
const phone = z
  .string()
  .trim()
  .regex(
    /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/,
    "Enter a valid 10-digit Indian mobile number",
  );

export const enquirySchemaV2 = z
  .object({
    // Step 1: dates and guests
    checkIn: z.string().min(1, "Select a check-in date"),
    checkOut: z.string().min(1, "Select a check-out date"),
    adults: count(1, 12, "At least 1 adult"),
    children: count(0, 10, "Enter 0 or more"),
    /** One entry per child, kept as text so empty fields can be flagged. */
    childAges: z.array(z.string()),
    infants: count(0, 4, "Enter 0 or more"),
    rooms: count(1, 6, "Between 1 and 6 rooms"),
    // Step 2: stay (a room slug, or "any")
    stay: z.string().min(1, "Choose a stay or no preference"),
    /** Chosen offer id, or "" for none. */
    offerId: z.string().optional(),
    /** Format check only: the resort confirms any code, nothing is applied here. */
    couponCode: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9-]{0,20}$/, "Use letters, numbers or a dash, up to 20 characters")
      .optional(),
    // Step 3: you
    name: z.string().trim().min(2, "Please enter your name"),
    phone,
    email: z.email("Please enter a valid email"),
    arrivalTime: z.string().optional(),
    occasion: z.enum(OCCASIONS, { error: "Please choose an occasion" }),
    requests: z
      .string()
      .trim()
      .max(1000, "Please keep this under 1000 characters")
      .optional(),
    /** Payment is always at the resort: there is no online payment. */
    paymentPreference: z.literal("pay_at_resort"),
    houseRules: z
      .boolean()
      .refine((value) => value, "Please confirm you have read the house rules"),
    consent: z.boolean().refine((value) => value, "Please agree so we can contact you"),
  })
  .refine(
    (value) => !value.checkIn || !value.checkOut || value.checkOut > value.checkIn,
    {
      path: ["checkOut"],
      message: "Check-out must be after check-in",
    },
  )
  .refine(
    (value) =>
      value.children === 0 ||
      value.childAges
        .slice(0, value.children)
        .filter((age) => age !== "" && Number(age) >= 0 && Number(age) <= 17).length ===
        value.children,
    { path: ["childAges"], message: "Please enter each child's age (0 to 17)" },
  );

export type EnquiryValuesV2 = z.infer<typeof enquirySchemaV2>;

/** Fields validated at each step, in order. */
export const STEP_FIELDS: (keyof EnquiryValuesV2)[][] = [
  ["checkIn", "checkOut", "adults", "children", "childAges", "infants", "rooms"],
  ["stay", "offerId", "couponCode"],
  [
    "name",
    "phone",
    "email",
    "arrivalTime",
    "occasion",
    "requests",
    "paymentPreference",
    "houseRules",
    "consent",
  ],
];
