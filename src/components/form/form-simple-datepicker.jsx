"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function FormSimpleDatePicker({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder = "Pick a date",
  containerClassName,
  className,
  showLabel = true,
  disabled = false,
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate) => {
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <Field className={cn("flex flex-col gap-2.5", containerClassName)}>
      {showLabel && label && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <span className=" text-red-500">*</span>}
        </FieldLabel>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-red-500",
              className,
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, "d MMMM yyyy", { locale: id })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            initialFocus
            defaultMonth={value}
            locale={id}
          />
        </PopoverContent>
      </Popover>

      {error && (
        <FieldDescription className="text-xs text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}
