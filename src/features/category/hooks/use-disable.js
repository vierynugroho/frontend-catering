import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { disableCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDisableCategory({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const disable = useMutation({
    mutationFn: ({ id }) => disableCategory(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-category"] });
      invalidateDashboardReports(queryClient);
      toast.success(res.message);
      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });

  return { disable };
}
