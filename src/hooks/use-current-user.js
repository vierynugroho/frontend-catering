import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth";
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await getCurrentUser();
      console.log(res.data);

      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
