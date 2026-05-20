import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { confirmPublicOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useConfirmOrder({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const confirm = useMutation({
    mutationFn: ({ id }) => confirmPublicOrder(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["customer-order-detail-history"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer-order-history"],
      });
      invalidateDashboardReports(queryClient);
      toast.success(res.message);

      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { confirm };
}
