"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { cn } from "@/lib/utils";

// utils
function formatDate(date) {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

// component
export function FormDatePicker({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder = "Select date",
  containerClassName,
  className,
  showLabel = true,
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(value);
  const [month, setMonth] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(formatDate(value));

  // sync external value (important for edit form)
  React.useEffect(() => {
    setDate(value);
    setMonth(value);
    setInputValue(formatDate(value));
  }, [value]);

  return (
    <Field className={containerClassName}>
      {showLabel && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </FieldLabel>
      )}

      <InputGroup>
        <InputGroupInput
          id={name}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          className={cn(error && "border-red-500", className)}
          onChange={(e) => {
            const val = e.target.value;
            setInputValue(val);

            const parsed = new Date(val);
            if (isValidDate(parsed)) {
              setDate(parsed);
              setMonth(parsed);
              onChange?.(parsed);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
              </InputGroupButton>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setInputValue(formatDate(selectedDate));
                  onChange?.(selectedDate);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
