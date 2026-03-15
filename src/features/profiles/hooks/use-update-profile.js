import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/auth";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const route = useRouter();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      toast.success(res.message);
      route.push("/");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};
