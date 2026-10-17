import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SpokenNote {
  id: string;
  name: string;
  text: string;
  /** Verbatim opening of a long review, ending at a full sentence. */
  excerpt?: string;
  profileUrl?: string;
}

export type TailSide = "left" | "center" | "right";

export const TAIL_SIDES: TailSide[] = ["left", "center", "right"];

const TAIL_POSITION: Record<TailSide, string> = {
  left: "left-8",
  center: "left-1/2 -translate-x-1/2",
  right: "right-8",
};
const NAME_ALIGN: Record<TailSide, string> = {
  left: "justify-start pl-5",
  center: "justify-center",
  right: "justify-end pr-5",
};

interface BubbleProps {
  note: SpokenNote;
  tail: TailSide;
  /** Show the excerpt (with a link to the full note) instead of the whole quote. */
  short?: boolean;
  /** Fixed height classes for a stage; leave out for natural height. */
  heightClass?: string;
  className?: string;
  id?: string;
}

/**
 * A spoken note: a soft speech bubble holding only the quote, a small tail, and the reviewer's name
 * below it. Nothing else is shown for a review.
 */
export function Bubble({
  note,
  tail,
  short = false,
  heightClass,
  className,
  id,
}: BubbleProps) {
  const useExcerpt = short && note.excerpt && note.excerpt !== note.text;
  const quote = useExcerpt ? note.excerpt : note.text;
  const name = (
    <span className="label-mono tracking-[0.2em] text-cloud uppercase">{note.name}</span>
  );

  return (
    <figure id={id} className={cn("m-0", className)}>
      <div
        className={cn(
          "relative flex flex-col rounded-[20px] border border-steel bg-bubble p-6 text-pearl sm:p-7",
          heightClass,
        )}
      >
        <blockquote className="m-0 min-h-0 flex-1">
          <p className="font-display text-[1.3rem] leading-snug text-pearl italic sm:text-[1.4rem]">
            <span aria-hidden="true" className="mr-1 text-champagne not-italic">
              &ldquo;
            </span>
            {quote}
          </p>
        </blockquote>
        {useExcerpt && (
          <Link
            href={`/testimonials#note-${note.id}`}
            className="label-mono touch-target mt-2 self-start text-[0.7rem] text-champagne underline decoration-champagne/60 underline-offset-4 hover:text-champagne-soft"
          >
            Read the full note<span className="sr-only"> by {note.name}</span>
          </Link>
        )}
        {/* Tail: a rotated square with the bubble's fill and border on its two outer sides */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-[9px] block h-[17px] w-[17px] rotate-45 border-r border-b border-steel bg-bubble",
            TAIL_POSITION[tail],
          )}
        />
      </div>
      <figcaption className={cn("mt-5 flex items-center gap-3", NAME_ALIGN[tail])}>
        <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-champagne" />
        {note.profileUrl ? (
          <a
            href={note.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-champagne underline-offset-4"
          >
            {name}
          </a>
        ) : (
          name
        )}
      </figcaption>
    </figure>
  );
}
