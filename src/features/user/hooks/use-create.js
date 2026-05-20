import { extractErrorMessage } from "@/lib/utils";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { createUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateUser({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createUser,
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

  return { create };
}
