import { z } from "zod";

export const orderSchema = z.object({
  customer_name: z.string().min(1, "Nama pelanggan wajib diisi"),
  phone: z
    .string()
    .regex(/^\d+$/, "Nomor telepon harus berupa angka")
    .min(10, "Nomor telepon minimal 10 digit"),
  destination: z.string().optional(),
  order_date: z
    .any()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Tanggal order wajib diisi",
    }),
  delivery_method: z.string().min(1, "Metode pengiriman wajib diisi"),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        menu_id: z.string().min(1, "Menu ID wajib diisi"),
        quantity: z.number().int().min(1, "Quantity minimal 1"),
      }),
    )
    .min(1, "Minimal 1 item"),

  shipping_cost: z.string().optional(),
  discount: z.string().optional(),
  order_status: z.string().optional(),
  shipping_status: z.string().optional(),
});

export const defaultValues = {
  customer_name: "",
  phone: "",
  destination: "",
  order_date: "",
  delivery_method: "",
  note: "",
  items: [],
};
