import { useQuery } from "@tanstack/react-query";
import { getPublicDetailOrder } from "@/services/order";

export const useCustomerOrderDetail = (params) => {
  return useQuery({
    queryKey: ["customer-order-detail-history", params],
    queryFn: async () => {
      const res = await getPublicDetailOrder(params);
      return res;
    },
  });
};
