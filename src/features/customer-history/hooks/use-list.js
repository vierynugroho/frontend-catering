import { useQuery } from "@tanstack/react-query";
import { getPublicOrder } from "@/services/order";

export const useCustomerOrderHistory = (params) => {
  return useQuery({
    queryKey: ["customer-order-history", params],
    queryFn: async () => {
      const res = await getPublicOrder(params);
      return res;
    },
  });
};
