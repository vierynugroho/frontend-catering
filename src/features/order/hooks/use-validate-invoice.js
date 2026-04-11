import { useQuery } from "@tanstack/react-query";
import { validateAdminDownloadInvoice } from "@/services/order";
export const useValidateInvoice = (order_id) => {
  return useQuery({
    queryKey: ["admin-validate-invoice", order_id],
    queryFn: async () => {
      const res = await validateAdminDownloadInvoice(order_id);
      return res;
    },
  });
};
