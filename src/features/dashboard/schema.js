import { z } from "zod";

export const downloadSchema = z.object({
  from: z
    .date({
      required_error: "Tanggal mulai wajib diisi",
    })
    .optional(),
  to: z
    .date({
      required_error: "Tanggal akhir wajib diisi",
    })
    .optional(),
  type: z.enum(["pdf", "csv", "xlsx"], {
    required_error: "Tipe file wajib dipilih",
  }),
});
