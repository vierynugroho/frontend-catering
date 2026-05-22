import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const menuSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter"),
  category_id: z.string().min(1, "Kategori wajib diisi"),

  price: z.string().min(1, "Harga wajib diisi"),
  min_order: z.coerce
    .number({ invalid_type_error: "Min order harus angka" })
    .int("Min order harus bilangan bulat")
    .min(1, "Min order minimal 1"),
  description: z.string().optional(),

  is_active: z.boolean(),

  images: z
    .array(z.any())
    .min(1, "Minimal 1 gambar")
    .max(5, "Maksimal 5 gambar")
    .refine(
      (items) => {
        return items.every((item) => {
          if (item instanceof File) {
            return item.size <= MAX_FILE_SIZE;
          }
          return true;
        });
      },
      {
        message: "Ukuran salah satu gambar melebihi 5MB",
      },
    ),
});

export const defaultValues = {
  id: "",
  name: "",
  slug: "",
  is_active: true,
  category_id: "",
  price: "",
  min_order: 1,
  description: "",
  images: [],
};
