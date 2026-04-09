import { useQuery } from "@tanstack/react-query";
import { validatePublicDownloadInvoice } from "@/services/order";

export const useCustomerValidateInvoice = (order_id) => {
  return useQuery({
    queryKey: ["customer-validate-invoice", order_id],
    queryFn: async () => {
      const res = await validatePublicDownloadInvoice(order_id);
      return res;
    },
  });
};
