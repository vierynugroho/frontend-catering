import { extractErrorMessage } from "@/lib/utils";
import { checkDateOrderStock } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCheckOrderStock() {
  const queryClient = useQueryClient();

  const checkStock = useMutation({
    mutationFn: checkDateOrderStock,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["customer-check-stock"] });
      const { is_available, out_of_stock } = res.data;

      const isStockAvailable = is_available && !out_of_stock;

      isStockAvailable
        ? toast.success("Stok tersedia pada tanggal ini")
        : toast.error(
            "Stok tidak tersedia pada tanggal ini, silakan pilih tanggal lain atau silahkan hubungi admin untuk perubahan jadwal pesanan",
          );
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { checkStock, checkStockResult: checkStock.data };
}
