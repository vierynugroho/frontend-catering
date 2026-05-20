import { extractErrorMessage } from "@/lib/utils";
import { updateMenu } from "@/services/menu";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateMenu({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateMenu(id, payload),
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

  return { update };
}
