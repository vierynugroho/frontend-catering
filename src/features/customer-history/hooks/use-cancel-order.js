import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { cancelPublicOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCancelOrder({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const cancel = useMutation({
    mutationFn: ({ id }) => cancelPublicOrder(id),
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

  return { cancel };
}
