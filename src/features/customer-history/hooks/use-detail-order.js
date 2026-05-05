import { useQuery } from "@tanstack/react-query";
import { getPublicDetailOrder } from "@/services/order";

export const useCustomerOrderDetail = (id, params) => {
  return useQuery({
    queryKey: ["customer-order-detail-history", id, params],
    queryFn: async () => {
      const res = await getPublicDetailOrder(id, params);
      return res;
    },
  });
};
