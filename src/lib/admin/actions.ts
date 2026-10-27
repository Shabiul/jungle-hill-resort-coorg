"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminEmail, requireAdmin } from "@/lib/admin/auth";
import { KEYS, invalidate } from "@/lib/cache";
import { isStatus } from "@/lib/admin/enquiries";
import { createServiceClient, createSessionClient } from "@/lib/supabase/server";

export interface LoginState {
  error?: string;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };

  if (!isAdminEmail(email)) {
    await supabase.auth.signOut();
    return { error: "This account does not have admin access." };
  }
  redirect("/admin");
}

export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export interface SaveState {
  ok?: boolean;
  error?: string;
}

export async function saveEnquiry(
  id: string,
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await requireAdmin();
  const status = formData.get("status");
  const notes = String(formData.get("admin_notes") ?? "").slice(0, 5000);
  if (!isStatus(status)) return { error: "Choose a valid status." };

  const { error } = await createServiceClient()
    .from("enquiries")
    .update({ status, admin_notes: notes })
    .eq("id", id);
  if (error) return { error: "Could not save. Try again." };

  await invalidate(KEYS.dashboard);
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();
  await createServiceClient().from("enquiries").delete().eq("id", id);
  await invalidate(KEYS.dashboard);
  revalidatePath("/admin", "layout");
  redirect("/admin/enquiries");
}
