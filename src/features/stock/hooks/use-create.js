import { extractErrorMessage } from "@/lib/utils";
import { createStock } from "@/services/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateStock({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createStock,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-stock"] });
      toast.success(res.message);

      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { create };
}
