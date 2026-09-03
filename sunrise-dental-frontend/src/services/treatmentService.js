import api from "./api";

// Create treatment
export const createTreatment = async (data) => {
  const response = await api.post("/treatments", data);
  return response.data;
};

// Get treatment by ID
export const getTreatmentById = async (id) => {
  const response = await api.get(`/treatments/${id}`);
  return response.data;
};

// Get all treatments
export const getAllTreatments = async () => {
  const response = await api.get("/treatments");
  return response.data;
};

// Get treatments by patient
export const getTreatmentsByPatient = async (patientId) => {
  const response = await api.get(
    `/treatments/patient/${patientId}`
  );
  return response.data;
};

// Get treatments by dentist
export const getTreatmentsByDentist = async (dentistId) => {
  const response = await api.get(
    `/treatments/dentist/${dentistId}`
  );
  return response.data;
};

// Get treatments by appointment
export const getTreatmentsByAppointment = async (appointmentId) => {
  const response = await api.get(
    `/treatments/appointment/${appointmentId}`
  );
  return response.data;
};

// Update treatment
export const updateTreatment = async (id, data) => {
  const response = await api.put(
    `/treatments/${id}`,
    data
  );
  return response.data;
};

// Delete treatment
export const deleteTreatment = async (id) => {
  const response = await api.delete(
    `/treatments/${id}`
  );
  return response.data;
};