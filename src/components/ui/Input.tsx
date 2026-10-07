import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

// TODO: design
export function Input({ label, error, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(className)}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
