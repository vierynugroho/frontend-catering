import { checkDateOrderStock } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCheckOrderStock() {
  const queryClient = useQueryClient();

  const checkStock = useMutation({
    mutationFn: checkDateOrderStock,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["customer-check-stock"] });
      res.data.is_available
        ? toast.success("Stok tersedia pada tanggal ini")
        : toast.error(
            "Stok tidak tersedia pada tanggal ini, silakan pilih tanggal lain",
          );
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { checkStock, checkStockResult: checkStock.data };
}
