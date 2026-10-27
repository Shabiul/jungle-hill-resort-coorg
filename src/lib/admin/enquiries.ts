export const STATUSES = ["new", "contacted", "confirmed", "closed", "spam"] as const;
export type EnquiryStatus = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  closed: "Closed",
  spam: "Spam",
};

export interface EnquiryRow {
  id: string;
  created_at: string;
  updated_at: string;
  source: "wizard" | "contact";
  status: EnquiryStatus;
  name: string;
  email: string | null;
  phone: string | null;
  check_in: string | null;
  check_out: string | null;
  adults: number | null;
  children: number | null;
  infants: number | null;
  rooms: number | null;
  stay: string | null;
  occasion: string | null;
  message: string | null;
  details: Record<string, unknown>;
  admin_notes: string;
}

export function isStatus(value: unknown): value is EnquiryStatus {
  return typeof value === "string" && (STATUSES as readonly string[]).includes(value);
}

export function formatDate(value: string | null, withTime = false) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
    timeZone: "Asia/Kolkata",
  }).format(new Date(withTime ? value : `${value}T00:00:00`));
}
