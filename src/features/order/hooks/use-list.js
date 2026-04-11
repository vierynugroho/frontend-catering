import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/services/order";

export const useOrder = (params) => {
  return useQuery({
    queryKey: ["admin-order", params],
    queryFn: async () => {
      const res = await getOrder(params);
      return res;
    },
  });
};
