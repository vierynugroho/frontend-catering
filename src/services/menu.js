import api from "@/lib/axios";

export const getPublicMenu = async (params) => {
  const res = await api.get("/menus", { params });
  return res.data;
};

export const getMenu = async (params) => {
  const res = await api.get("/admin/menus", { params });
  return res.data;
};

export const createMenu = async (payload) => {
  const res = await api.post("/menus", payload);
  return res.data;
};

export const updateMenu = async (id, payload) => {
  const res = await api.put(`/menus/${id}`, payload);
  return res.data;
};

export const deleteMenu = async (id) => {
  const res = await api.delete(`/menus/${id}?force-delete=true`);
  return res.data;
};

export const disableMenu = async (id) => {
  const res = await api.delete(`/menus/${id}`);
  return res.data;
};


