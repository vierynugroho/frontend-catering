import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  fullname: z.string().min(3, "Nama minimal 3 karakter"),

  password: z.string().optional(),

  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  address: z.string().optional(),
  is_active: z.boolean().optional(),

  customer_type: z.enum(["new_customer", "reguler_customer"], {
    message: "Tipe pelanggan tidak valid",
  }),

  role: z.enum(["admin", "customer"], {
    message: "Role tidak valid",
  }),
});

export const defaultValues = {
  id: "",
  email: "",
  fullname: "",
  password: "",
  phone: "",
  is_active: true,
  address: "",
  customer_type: "new_customer",
  role: "customer",
};
