"use client";

import { useActionState } from "react";
import { saveEnquiry, type SaveState } from "@/lib/admin/actions";
import { STATUSES, STATUS_LABEL, type EnquiryStatus } from "@/lib/admin/enquiries";

const field =
  "mt-1 block w-full rounded-[6px] border border-line bg-card px-3 py-2 text-small focus:border-burgundy focus:outline-none";

interface SaveFormProps {
  id: string;
  status: EnquiryStatus;
  notes: string;
}

export function SaveForm({ id, status, notes }: SaveFormProps) {
  const [state, action, pending] = useActionState<SaveState, FormData>(
    saveEnquiry.bind(null, id),
    {},
  );
  return (
    <form action={action} className="space-y-4">
      <label className="block text-small">
        Status
        <select name="status" defaultValue={status} className={`${field} min-h-11`}>
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {STATUS_LABEL[item]}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-small">
        Internal notes (never shown to the guest)
        <textarea
          name="admin_notes"
          defaultValue={notes}
          rows={6}
          maxLength={5000}
          className={field}
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 rounded-[6px] bg-burgundy px-4 text-small text-ivory disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save"}
        </button>
        <p role="status" className="text-small">
          {state.ok ? "Saved." : state.error}
        </p>
      </div>
    </form>
  );
}
