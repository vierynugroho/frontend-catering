import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      const { token, user } = res.data;

      Cookies.set("access_token", token, {
        path: "/",
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      Cookies.set("role", user.role, {
        path: "/",
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });

      const destination =
        user.role === "admin" ? "/admin/dashboard" : "/customer/menu";

      window.location.href = destination;
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
};