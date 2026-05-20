import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { disableUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDisableUser({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const disable = useMutation({
    mutationFn: ({ id }) => disableUser(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-user"] });
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
