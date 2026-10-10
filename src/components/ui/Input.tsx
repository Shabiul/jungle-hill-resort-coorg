import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldBase =
  "mt-1 block w-full min-h-11 border-0 border-b border-ink/40 bg-transparent px-0 py-2 text-ink placeholder:text-stone focus:border-brass-deep focus:outline-none aria-[invalid=true]:border-b-2 aria-[invalid=true]:border-ink";

export type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="label-mono field-label block text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(fieldBase, "field-control", className)}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1 text-sm text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="field-error mt-1 text-sm font-medium text-ink"
        >
          {error}
        </p>
      )}
    </div>
  );
}
