import { useQuery } from "@tanstack/react-query";
import { getStockCalendar } from "@/services/stock";

export const useStockCalendar = (params, options = {}) => {
  return useQuery({
    queryKey: ["stock-calendar", params],
    queryFn: () => getStockCalendar(params),
    ...options,
  });
};
