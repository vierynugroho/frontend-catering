import { useQuery } from "@tanstack/react-query";
import { getMenu } from "@/services/menu";

export const useMenus = (params) => {
  return useQuery({
    queryKey: ["admin-menu", params],
    queryFn: async () => {
      const res = await getMenu(params);
      return res;
    },
  });
};
