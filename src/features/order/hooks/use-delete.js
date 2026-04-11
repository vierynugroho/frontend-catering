import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteOrder } from "@/services/order";

export function useDeleteOrder({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: ({ id }) => deleteOrder(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-order"] });
      toast.success(res.message);
      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { deleted };
}
