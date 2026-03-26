import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";

export const useUser = (params) => {
  return useQuery({
    queryKey: ["admin-user", params],
    queryFn: async () => {
      const res = await getUser(params);
      return res;
    },
  });
};
