import api from "@/lib/axios";

export const getPublicOrder = async (params) => {
  const res = await api.get("/orders", { params });
  return res.data;
};

export const getPublicDetailOrder = async (id, params) => {
  const res = await api.get(`/orders/${id}`, { params });
  return res.data;
};

export const cancelPublicOrder = async (order_id) => {
  const res = await api.post(`/orders/${order_id}/cancel`);
  return res.data;
};
export const confirmPublicOrder = async (order_id) => {
  const res = await api.post(`/orders/${order_id}/confirm`);
  return res.data;
};

export const validatePublicDownloadInvoice = async (order_id) => {
  const res = await api.get(`/orders/${order_id}/invoice/validate`);
  return res.data;
};

export const publicDownloadInvoice = async (order_id) => {
  const res = await api.get(`/orders/${order_id}/invoice`, {
    responseType: "blob",
  });
  return res.data;
};

export const checkDateOrderStock = async (payload) => {
  const res = await api.post("/orders/check-date-order-stock", payload);
  return res.data;
};

export const getOrder = async (params) => {
  const res = await api.get("/admin/orders", { params });
  return res.data;
};
export const getDetailOrder = async (id, params) => {
  const res = await api.get(`/admin/orders/${id}`, { params });
  return res.data;
};

export const createOrder = async (payload) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

export const updateOrder = async (id, payload) => {
  const res = await api.put(`/admin/orders/${id}`, payload);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/admin/orders/${id}`);
  return res.data;
};

export const validateAdminDownloadInvoice = async (order_id) => {
  const res = await api.get(`/admin/orders/${order_id}/invoice/validate`);
  return res.data;
};
export const adminDownloadInvoice = async (order_id) => {
  const res = await api.get(`/admin/orders/${order_id}/invoice`, {
    responseType: "blob",
  });
  return res.data;
};
