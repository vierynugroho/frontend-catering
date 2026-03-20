import { deleteCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCategory({ onSuccessCallback } = {}) {
  const queryClient = useQueryClient();

  const deleted = useMutation({
    mutationFn: ({ id }) => deleteCategory(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-category"] });
      toast.success(res.message);
      onSuccessCallback?.();
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });

  return { deleted };
}
