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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function FormDateTimePicker({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder = "Pilih tanggal dan waktu",
  containerClassName,
  className,
  showLabel = true,
  disabled = false,
}) {
  const [open, setOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      if (value) {
        const newDate = new Date(selectedDate);
        newDate.setHours(value.getHours());
        newDate.setMinutes(value.getMinutes());
        onChange?.(newDate);
      } else {
        onChange?.(selectedDate);
      }
    }
  };

  const handleTimeChange = (type, timeValue) => {
    const baseDate = value ? new Date(value) : new Date();

    if (type === "hour") {
      const isPM = baseDate.getHours() >= 12;
      const h = parseInt(timeValue);
      baseDate.setHours(isPM ? (h % 12) + 12 : h % 12);
    } else if (type === "minute") {
      baseDate.setMinutes(parseInt(timeValue));
    } else if (type === "ampm") {
      const currentHours = baseDate.getHours();
      if (timeValue === "PM" && currentHours < 12) {
        baseDate.setHours(currentHours + 12);
      } else if (timeValue === "AM" && currentHours >= 12) {
        baseDate.setHours(currentHours - 12);
      }
    }
    onChange?.(baseDate);
  };

  return (
    <Field className={cn("flex flex-col gap-2.5", containerClassName)}>
      {showLabel && label && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ">*</span>}
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
              format(value, "d MMMM yyyy HH:mm", { locale: id })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="sm:flex">
            {/* Bagian Kalender */}
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              initialFocus
              locale={id}
            />

            {/* Bagian Seleksi Waktu */}
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x border-t sm:border-t-0">
              {/* Jam */}
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              {/* Menit */}
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        value && value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>

              {/* AM/PM */}
              <ScrollArea className="">
                <div className="flex sm:flex-col p-2">
                  {["AM", "PM"].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={
                        value &&
                        ((ampm === "AM" && value.getHours() < 12) ||
                          (ampm === "PM" && value.getHours() >= 12))
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("ampm", ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
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