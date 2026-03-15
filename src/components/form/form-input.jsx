import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

import { cn } from "@/lib/utils";

export function FormInput({
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
      <FieldLabel htmlFor={name}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </FieldLabel>

      <Input
        id={name}
        name={name}
        className={cn(error && "border-red-500", className)}
        {...props}
      />

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
