import api from "@/lib/axios";

export const getStock = async (params) => {
  const res = await api.get("/admin/order-stocks", { params });
  return res.data;
};

export const createStock = async (payload) => {
  const res = await api.post("/admin/order-stocks", payload);
  return res.data;
};

export const updateStock = async (id, payload) => {
  const res = await api.put(`/admin/order-stocks/${id}`, payload);
  return res.data;
};

export const deleteStock = async (id) => {
  const res = await api.delete(`/admin/order-stocks/${id}`);
  return res.data;
};
