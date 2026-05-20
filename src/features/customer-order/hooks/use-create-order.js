import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { createOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateOrder({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();
  const route = useRouter();

  const create = useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["customer-create-order"] });
      invalidateDashboardReports(queryClient);
      toast.success(res.message);
      route.push(`/customer/history/${res.data.id}`);
      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { create };
}
