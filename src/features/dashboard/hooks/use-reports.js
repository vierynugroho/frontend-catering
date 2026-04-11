import { useQuery } from "@tanstack/react-query";
import {
  getOrderReports,
  getStockReports,
  getCustomerReports,
  getMenuReports,
  getShippingReports,
} from "@/services/dashboard";

export const useOrderReport = (params) => {
  return useQuery({
    queryKey: ["admin-dashboard-order-reports", params],
    queryFn: async () => {
      const res = await getOrderReports(params);
      return res;
    },
  });
};
export const useStockReport = (params) => {
  return useQuery({
    queryKey: ["admin-dashboard-stock-reports", params],
    queryFn: async () => {
      const res = await getStockReports(params);
      return res;
    },
  });
};
export const useCustomerReport = (params) => {
  return useQuery({
    queryKey: ["admin-dashboard-customer-reports", params],
    queryFn: async () => {
      const res = await getCustomerReports(params);
      return res;
    },
  });
};
export const useMenuReport = (params) => {
  return useQuery({
    queryKey: ["admin-dashboard-menu-reports", params],
    queryFn: async () => {
      const res = await getMenuReports(params);
      return res;
    },
  });
};
export const useShippingReport = (params) => {
  return useQuery({
    queryKey: ["admin-dashboard-shipping-reports", params],
    queryFn: async () => {
      const res = await getShippingReports(params);
      return res;
    },
  });
};
