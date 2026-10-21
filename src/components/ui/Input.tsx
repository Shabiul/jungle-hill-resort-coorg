import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldBase =
  "mt-1 block w-full min-h-11 rounded-[6px] border border-line bg-card px-3 py-2 text-body placeholder:text-body/60 focus:border-burgundy focus:outline-none aria-[invalid=true]:border-burgundy";

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
        <label htmlFor={inputId} className="label-mono field-label block text-body">
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
        <p id={`${inputId}-hint`} className="mt-1 text-sm text-body">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="field-error mt-1 text-sm font-medium text-body"
        >
          {error}
        </p>
      )}
    </div>
  );
}
