import api from "@/lib/axios";

export const getOrderReports = async (params) => {
  const res = await api.get("/reports/order", { params });
  return res.data;
};
export const getStockReports = async (params) => {
  const res = await api.get("/reports/stock", { params });
  return res.data;
};
export const getShippingReports = async (params) => {
  const res = await api.get("/reports/shipping", { params });
  return res.data;
};
export const getMenuReports = async (params) => {
  const res = await api.get("/reports/menu", { params });
  return res.data;
};
export const getCustomerReports = async (params) => {
  const res = await api.get("/reports/customer", { params });
  return res.data;
};

export const downloadReports = async (type, params) => {
  const res = await api.get(`/orders/export/${type}`, {
    params,
    responseType: "blob",
  });
  return res.data;
};


