import { register } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      Cookies.set("access_token", res.data.token, {
        path: "/",
        expires: 7,
      });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      toast.success(res.message);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};
