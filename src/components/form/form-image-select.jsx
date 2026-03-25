"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function FormImageUpload({
  label,
  name,
  error,
  required,

  value = [],
  onChange,

  multiple = true,
  containerClassName,
  className,
}) {
  const inputRef = useRef(null);
  const [isDirty, setIsDirty] = useState(false);

  // preview (derived)
  const preview = useMemo(() => {
    if (!value) return [];

    return value.map((item) => {
      if (!isDirty && item?.url) {
        return item.url;
      }

      if (item instanceof File) {
        return URL.createObjectURL(item);
      }

      return "";
    });
  }, [value, isDirty]);
  // cleanup blob URL
  useEffect(() => {
    return () => {
      preview.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [preview]);

  // open file picker
  const handleClick = () => {
    inputRef.current?.click();
  };

  const MAX_FILES = 5;

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);

    let newFiles = [];

    if (!isDirty) {
      newFiles = files;
    } else {
      newFiles = [...(value || []), ...files];
    }

    if (newFiles.length > MAX_FILES) {
      newFiles = newFiles.slice(0, MAX_FILES);
      toast.error(`Maksimal upload ${MAX_FILES} gambar`);
    }

    setIsDirty(true);
    onChange?.(newFiles);

    e.target.value = "";
  };

  // remove
  const handleRemove = (index) => {
    let newValue = [];

    if (!isDirty) {
      // dari API → langsung kosong semua
      newValue = [];
    } else {
      // dari file baru → hapus biasa
      newValue = [...value];
      newValue.splice(index, 1);
    }

    setIsDirty(true);
    onChange?.(newValue);
  };

  return (
    <Field className={containerClassName}>
      {label && (
        <FieldLabel>
          {label}
          {required && <span className="text-red-500">*</span>}
        </FieldLabel>
      )}

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        multiple={multiple}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* Dropzone Style */}
      <div
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          "border-2 border-dashed rounded-xl p-6 cursor-pointer",
          "transition hover:border-primary hover:bg-muted/50",
          error && "border-red-500",
          className,
        )}
      >
        <div className="text-3xl">📤</div>
        <p className="text-sm font-medium">Click to upload images</p>
        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {preview.map((src, index) => (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt="preview"
                className="w-full h-32 object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
