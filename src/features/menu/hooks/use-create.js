import { extractErrorMessage } from "@/lib/utils";
import { createMenu } from "@/services/menu";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateMenu({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createMenu,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-menu"] });
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
