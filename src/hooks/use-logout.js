import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("role", { path: "/" });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["current-user"] });

      toast.success("Logout success");

      router.push("/login");
    },
  });
};
