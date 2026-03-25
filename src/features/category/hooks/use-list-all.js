import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/services/category";

export const useAllCategories = (params) => {
  return useQuery({
    queryKey: ["admin-category-all", params],
    queryFn: async () => {
      const res = await getCategory(params);
      return res;
    },
  });
};
