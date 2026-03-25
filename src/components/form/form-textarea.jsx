import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import { cn } from "@/lib/utils";

export function FormTextarea({
  label,
  name,
  error,
  containerClassName,
  className,
  required,
  ...props
}) {
  return (
    <Field className={containerClassName}>
      {label && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </FieldLabel>
      )}

      <Textarea
        id={name}
        name={name}
        className={cn(
          "min-h-[100px]", // biar enak defaultnya
          error && "border-red-500 focus-visible:ring-red-500",
          className,
        )}
        {...props}
      />

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
