import { z } from "zod";

export const profileSchema = z
  .object({
    email: z.string().email("Email tidak valid").optional(),
    fullname: z.string().min(2, "Nama minimal 2 karakter").optional(),
    phone: z.string().min(2, "telefon minimal 2 karakter").optional(),
    address: z.string().optional(),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.password) return;

    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password minimal 8 karakter",
        path: ["password"],
      });
    }

    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password tidak sama",
        path: ["confirm_password"],
      });
    }
  });
