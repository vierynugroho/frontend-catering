import { register } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      const { token, user } = res.data;

      Cookies.set("access_token", token, { path: "/", expires: 7 });
      Cookies.set("role", user.role, { path: "/", expires: 7 });
      route.push(user.role === "admin" ? "/admin/dashboard" : "/");
      
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      toast.success(res.message);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};
