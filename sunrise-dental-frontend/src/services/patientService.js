import api from "./api";

export const createPatient = async (data) => {
  const response = await api.post("/patients", data);
  return response.data;
};

export const getAllPatients = async () => {
  const response = await api.get("/patients");
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const updatePatient = async (id, data) => {
  const response = await api.put(`/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

export const searchPatients = async (keyword) => {
  const response = await api.get("/patients/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

export const getPatientAge = async (id) => {
  const response = await api.get(`/patients/${id}/age`);
  return response.data;
};