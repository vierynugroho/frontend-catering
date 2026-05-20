import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { updateUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUser({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-customer"] });
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
