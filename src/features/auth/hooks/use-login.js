import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const useLogin = () => {
  const queryClient = useQueryClient();
  const route = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      toast.success(res.message);
      const role = res.data.user.role;
      Cookies.set("access_token", res.data.token, {
        path: "/",
        expires: 7,
      });

      route.push(role === "admin" ? "/admin/dashboard" : "/");

      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};
