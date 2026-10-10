import { NextResponse } from "next/server";
import { bookingSchema, enquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const booking = bookingSchema.safeParse(body);
  const parsed = booking.success ? booking : enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: send each enquiry to reservations@junglehillresort.co.in (and/or WhatsApp). Deliver the enquiry (email / WhatsApp Business API / CRM) and add spam protection.
  return NextResponse.json({ ok: true });
}
