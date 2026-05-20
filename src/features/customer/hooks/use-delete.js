import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { deleteUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteUser({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: ({ id }) => deleteUser(id),
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

  return { deleted };
}
