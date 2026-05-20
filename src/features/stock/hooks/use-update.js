import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { updateStock } from "@/services/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateStock({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateStock(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-stock"] });
      invalidateDashboardReports(queryClient);
      toast.success(res.message);
      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { update };
}
