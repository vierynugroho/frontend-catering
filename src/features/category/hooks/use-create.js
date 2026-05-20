import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { createCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateCategory({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-category-all"] });
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

  return { create };
}
