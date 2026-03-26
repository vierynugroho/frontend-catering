import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter"),
});

export const defaultValues = {
  id: "",
  name: "",
  slug: "",
};
