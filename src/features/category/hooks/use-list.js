import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/services/category";

export const useCategories = (params) => {
  return useQuery({
    queryKey: ["admin-category", params],
    queryFn: async () => {
      const res = await getCategory(params);
      return res;
    },
  });
};
