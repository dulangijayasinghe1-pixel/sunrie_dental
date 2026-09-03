import api from "./api";

export const createDentist = async (data) => {
  const response = await api.post("/dentists", data);
  return response.data;
};

export const getAllDentists = async () => {
  const response = await api.get("/dentists");
  return response.data;
};

export const getDentistById = async (id) => {
  const response = await api.get(`/dentists/${id}`);
  return response.data;
};

export const updateDentist = async (id, data) => {
  const response = await api.put(`/dentists/${id}`, data);
  return response.data;
};

export const deleteDentist = async (id) => {
  const response = await api.delete(`/dentists/${id}`);
  return response.data;
};

export const searchDentists = async (keyword) => {
  const response = await api.get("/dentists/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

export const getActiveDentists = async () => {
  const response = await api.get("/dentists/active");
  return response.data;
};