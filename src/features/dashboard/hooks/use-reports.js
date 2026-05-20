import { useQuery } from "@tanstack/react-query";
import {
  getOrderReports,
  getStockReports,
  getCustomerReports,
  getMenuReports,
  getShippingReports,
} from "@/services/dashboard";

export const dashboardReportKeys = {
  all: ["admin-dashboard-reports"],
  order: (params) => [...dashboardReportKeys.all, "order", params],
  stock: (params) => [...dashboardReportKeys.all, "stock", params],
  customer: (params) => [...dashboardReportKeys.all, "customer", params],
  menu: (params) => [...dashboardReportKeys.all, "menu", params],
  shipping: (params) => [...dashboardReportKeys.all, "shipping", params],
};

export const dashboardReportQueryOptions = {
  refetchOnMount: "always",
};

export const invalidateDashboardReports = (queryClient) => {
  return queryClient.invalidateQueries({ queryKey: dashboardReportKeys.all });
};

export const useOrderReport = (params) => {
  return useQuery({
    queryKey: dashboardReportKeys.order(params),
    queryFn: async () => {
      const res = await getOrderReports(params);
      return res;
    },
    ...dashboardReportQueryOptions,
  });
};
export const useStockReport = (params) => {
  return useQuery({
    queryKey: dashboardReportKeys.stock(params),
    queryFn: async () => {
      const res = await getStockReports(params);
      return res;
    },
    ...dashboardReportQueryOptions,
  });
};
export const useCustomerReport = (params) => {
  return useQuery({
    queryKey: dashboardReportKeys.customer(params),
    queryFn: async () => {
      const res = await getCustomerReports(params);
      return res;
    },
    ...dashboardReportQueryOptions,
  });
};
export const useMenuReport = (params) => {
  return useQuery({
    queryKey: dashboardReportKeys.menu(params),
    queryFn: async () => {
      const res = await getMenuReports(params);
      return res;
    },
    ...dashboardReportQueryOptions,
  });
};
export const useShippingReport = (params) => {
  return useQuery({
    queryKey: dashboardReportKeys.shipping(params),
    queryFn: async () => {
      const res = await getShippingReports(params);
      return res;
    },
    ...dashboardReportQueryOptions,
  });
};
