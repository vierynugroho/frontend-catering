import api from "@/lib/axios";

export const getPublicOrder = async (params) => {
  const res = await api.get("/orders", { params });
  return res.data;
};

export const getPublicDetailOrder = async (id, params) => {
  const res = await api.get(`/orders/${id}`, { params });
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

export const createOrder = async (payload) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

export const updateOrder = async (id, payload) => {
  const res = await api.put(`/orders/${id}`, payload);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};
