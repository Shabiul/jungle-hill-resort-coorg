import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

// TODO: design
export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <textarea
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(className)}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
