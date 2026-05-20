import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { deleteStock } from "@/services/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteStock({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: ({ id }) => deleteStock(id),
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

  return { deleted };
}
