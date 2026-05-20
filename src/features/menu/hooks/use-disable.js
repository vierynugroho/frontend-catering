import { extractErrorMessage } from "@/lib/utils";
import { disableMenu } from "@/services/menu";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDisableMenu({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const disable = useMutation({
    mutationFn: ({ id }) => disableMenu(id),
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

  return { disable };
}
