import api from "@/lib/axios";

export const getUser = async (params) => {
  const res = await api.get("/admin/users", { params });
  return res.data;
};

export const createUser = async (payload) => {
  const res = await api.post("/admin/users", payload);
  return res.data;
};

export const updateUser = async (id, payload) => {
  const res = await api.put(`/admin/users/${id}`, payload);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}?force-delete=true`);
  return res.data;
};
export const disableUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};
