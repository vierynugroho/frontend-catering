import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteOrder } from "@/services/order";
import { extractErrorMessage } from "@/lib/utils";

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
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { deleted };
}
