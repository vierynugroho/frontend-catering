import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { updateOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUpdateOrder({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();
  const route = useRouter();

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateOrder(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-order"] });
      invalidateDashboardReports(queryClient);
      toast.success(res.message);
      route.push(`/admin/order`);

      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { update };
}
