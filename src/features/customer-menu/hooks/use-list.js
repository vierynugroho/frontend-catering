import { useQuery } from "@tanstack/react-query";
import { getPublicMenu } from "@/services/menu";
import { getCategory } from "@/services/category";

export const usePublicMenu = (params) => {
  return useQuery({
    queryKey: ["customer-menu", params],
    queryFn: async () => {
      const res = await getPublicMenu(params);
      return res;
    },
  });
};

export const usePublicCategory = (params) => {
  return useQuery({
    queryKey: ["category-menu", params],
    queryFn: async () => {
      const res = await getCategory(params);
      return res;
    },
  });
};
