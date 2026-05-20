import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { updateCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateCategory({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateCategory(id, payload),
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

  return { update };
}
