import "server-only";
import type { EnquiryValuesV2 } from "@/lib/enquiry-schema";
import { KEYS, invalidate } from "@/lib/cache";
import { createServiceClient } from "@/lib/supabase/server";
import type { ContactValues } from "@/lib/validations";

export async function saveWizardEnquiry(values: EnquiryValuesV2) {
  const { error } = await createServiceClient()
    .from("enquiries")
    .insert({
      source: "wizard",
      name: values.name,
      email: values.email,
      phone: values.phone,
      check_in: values.checkIn,
      check_out: values.checkOut,
      adults: values.adults,
      children: values.children,
      infants: values.infants,
      rooms: values.rooms,
      stay: values.stay,
      occasion: values.occasion,
      message: values.requests || null,
      details: {
        childAges: values.childAges.slice(0, values.children),
        offerId: values.offerId || null,
        couponCode: values.couponCode || null,
        arrivalTime: values.arrivalTime || null,
        paymentPreference: values.paymentPreference,
      },
    });
  if (error) throw new Error(error.message);
  await invalidate(KEYS.dashboard);
}

export async function saveContactMessage(values: ContactValues) {
  const { error } = await createServiceClient()
    .from("enquiries")
    .insert({
      source: "contact",
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      message: values.message,
    });
  if (error) throw new Error(error.message);
  await invalidate(KEYS.dashboard);
}
