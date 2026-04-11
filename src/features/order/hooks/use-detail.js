import { useQuery } from "@tanstack/react-query";
import { getDetailOrder } from "@/services/order";

export const useDetailOrder = (id) => {
  return useQuery({
    queryKey: ["admin-order", id],
    queryFn: async () => {
      const res = await getDetailOrder(id);
      return res;
    },
  });
};
