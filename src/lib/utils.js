import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatWIB(dateString, withTime = false) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }).format(date);
}
export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export const formatPhoneToLocal = (phone) => {
  if (phone.startsWith("+62")) {
    return String("0" + phone.slice(3));
  }
  return String(phone);
};

export function extractErrorMessage(error) {
  const defaultMessage = "Terjadi kesalahan";

  const data = error?.response?.data;

  if (!data) return defaultMessage;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((err) => err.message).join(", ");
  }

  return data.message || defaultMessage;
}

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // hapus karakter spesial
    .replace(/\s+/g, "-") // spasi jadi dash
    .replace(/--+/g, "-"); // hindari double dash
};
