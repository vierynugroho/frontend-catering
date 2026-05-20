import { extractErrorMessage } from "@/lib/utils";
import { deleteMenu } from "@/services/menu";
import { invalidateDashboardReports } from "@/features/dashboard/hooks/use-reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteMenu({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: ({ id }) => deleteMenu(id),
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

  return { deleted };
}
