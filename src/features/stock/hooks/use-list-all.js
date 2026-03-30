import { useQuery } from "@tanstack/react-query";
import { getStock } from "@/services/stock";

export const useAllStock = (params) => {
  return useQuery({
    queryKey: ["admin-stock-all", params],
    queryFn: async () => {
      const res = await getStock(params);
      return res;
    },
  });
};
