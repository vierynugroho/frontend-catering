import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { deleteCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCategory({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: ({ id }) => deleteCategory(id),
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

  return { deleted };
}
