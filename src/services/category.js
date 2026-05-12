import api from "@/lib/axios";

export const getCategory = async (params) => {
  const res = await api.get("/menus/categories", { params });
  return res.data;
};

export const createCategory = async (payload) => {
  const res = await api.post("/menus/categories", payload);
  return res.data;
};

export const updateCategory = async (id, payload) => {
  const res = await api.put(`/menus/categories/${id}`, payload);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await api.delete(`/menus/categories/${id}`);
  return res.data;
};
export const disableCategory = async (id) => {
  const res = await api.delete(`/menus/categories/${id}`);
  return res.data;
};
