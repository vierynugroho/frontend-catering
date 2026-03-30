import { useQuery } from "@tanstack/react-query";
import { getStock } from "@/services/stock";

export const useStocks = (params) => {
  return useQuery({
    queryKey: ["admin-stock", params],
    queryFn: async () => {
      const res = await getStock(params);
      return res;
    },
  });
};
