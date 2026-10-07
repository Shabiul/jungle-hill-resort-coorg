import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: deliver the enquiry (email / CRM) and add spam protection
  return NextResponse.json({ ok: true });
}
