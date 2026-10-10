import { NextResponse } from "next/server";
import { enquirySchemaV2 } from "@/lib/enquiry-schema";
import { bookingSchema, enquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const wizard = enquirySchemaV2.safeParse(body);
  const parsed = wizard.success
    ? wizard
    : bookingSchema.safeParse(body).success
      ? bookingSchema.safeParse(body)
      : enquirySchema.safeParse(body).success
        ? enquirySchema.safeParse(body)
        : wizard;

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: send each enquiry to reservations@junglehillresort.co.in (and/or WhatsApp). Deliver it via an
  // email provider (API key in .env.local) and add spam protection.
  return NextResponse.json({ ok: true });
}
