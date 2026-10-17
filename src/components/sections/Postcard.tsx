import type { Testimonial } from "@/types";

/** The reviewer's name in small tracked caps after a short champagne dash. Links only when a profile URL exists. */
export function PostcardName({
  note,
}: {
  note: Pick<Testimonial, "name" | "profileUrl">;
}) {
  const label = (
    <span className="label-mono tracking-[0.2em] text-graphite uppercase">
      {note.name}
    </span>
  );
  return (
    <p className="flex items-center gap-3">
      <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-champagne" />
      {note.profileUrl ? (
        <a
          href={note.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-champagne underline-offset-4"
        >
          {label}
        </a>
      ) : (
        label
      )}
    </p>
  );
}

/** A tiny postage-stamp square drawn with CSS. Decorative, no text. */
export function Stamp() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-3 right-3 block h-9 w-7 border border-champagne p-[3px]"
    >
      <span className="block h-full w-full border border-dashed border-champagne/70" />
    </span>
  );
}
