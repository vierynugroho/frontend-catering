import { z } from "zod";

export const menuSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter"),
  category_id: z.string().min(1, "Kategori wajib diisi"),

  price: z.string().min(1, "Harga wajib diisi"),
  description: z.string().optional(),

  is_active: z.boolean(),

  images: z
    .array(z.instanceof(File))
    .min(1, "Minimal 1 gambar")
    .max(5, "Maksimal 5 gambar"),
});

export const defaultValues = {
  id: "",
  name: "",
  slug: "",
  is_active: true,
  category_id: "",
  price: "",
  description: "",
  images: [],
};
