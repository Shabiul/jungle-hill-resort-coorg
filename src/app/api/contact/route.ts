import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/enquiry-store";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  if (await rateLimited(`contact:${clientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const body: unknown = await request.json().catch(() => null);

  // Honeypot: real visitors never see or fill this field.
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await saveContactMessage(parsed.data);
  } catch (error) {
    console.error("Failed to save contact message", error);
    return NextResponse.json({ ok: false, error: "Could not save your message." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
