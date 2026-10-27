import { NextResponse } from "next/server";
import { enquirySchemaV2 } from "@/lib/enquiry-schema";
import { saveWizardEnquiry } from "@/lib/enquiry-store";
import { clientIp, rateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (await rateLimited(`enquiry:${clientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const body: unknown = await request.json().catch(() => null);

  // Honeypot: real guests never see or fill this field. Pretend success so bots move on.
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = enquirySchemaV2.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await saveWizardEnquiry(parsed.data);
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return NextResponse.json({ ok: false, error: "Could not save your enquiry." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
