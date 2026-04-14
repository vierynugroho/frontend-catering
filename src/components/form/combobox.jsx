"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function FormComboBox({
  label,
  name,
  error,
  containerClassName,
  className,
  required,

  value,
  onChange,
  options = [],
  placeholder = "Pilih...",

  isLoading,
}) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Field className={containerClassName}>
      {label && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </FieldLabel>
      )}

      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              !selectedLabel && "text-muted-foreground",
              error && "border-red-500",
              className,
            )}
          >
            {selectedLabel || placeholder}

            <div className="flex items-center gap-1">
              {value && (
                <span
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange?.(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </span>
              )}
              <ChevronsUpDown className="opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0"
          style={{ width: "var(--radix-popover-trigger-width)" }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandInput
              placeholder={`Cari ${label?.toLowerCase() || ""}...`}
            />

            <CommandList
              className="max-h-[300px]"
              style={{
                overflow: "auto",
                overscrollBehavior: "contain",
              }}
            >
              {isLoading ? (
                <div className="p-3 text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : options.length === 0 ? (
                <CommandEmpty>Tidak ditemukan.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={`${option.label} ${option.value}`}
                      className="relative pr-8"
                      onSelect={() => {
                        onChange?.(option.value);
                        setOpen(false);
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "absolute right-2",
                          value === option.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
