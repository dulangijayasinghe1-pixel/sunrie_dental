import api from "./api";

// Create appointment
export const createAppointment = async (data) => {
  const response = await api.post("/appointments", data);
  return response.data;
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

// Get all appointments
export const getAllAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

// Get appointments by patient
export const getAppointmentsByPatient = async (patientId) => {
  const response = await api.get(
    `/appointments/patient/${patientId}`
  );
  return response.data;
};

// Get appointments by dentist
export const getAppointmentsByDentist = async (dentistId) => {
  const response = await api.get(
    `/appointments/dentist/${dentistId}`
  );
  return response.data;
};

// Get upcoming appointments
export const getUpcomingAppointments = async () => {
  const response = await api.get("/appointments/upcoming");
  return response.data;
};

// Get appointments by status
export const getAppointmentsByStatus = async (status) => {
  const response = await api.get(
    `/appointments/status/${status}`
  );
  return response.data;
};

// Update appointment
export const updateAppointment = async (id, data) => {
  const response = await api.put(
    `/appointments/${id}`,
    data
  );
  return response.data;
};

// Reschedule appointment
export const rescheduleAppointment = async (id, data) => {
  const response = await api.put(
    `/appointments/${id}/reschedule`,
    data
  );
  return response.data;
};

// Cancel appointment
export const cancelAppointment = async (id, data) => {
  const response = await api.put(
    `/appointments/${id}/cancel`,
    data
  );
  return response.data;
};

// Complete appointment
export const completeAppointment = async (id) => {
  const response = await api.put(
    `/appointments/${id}/complete`
  );
  return response.data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const response = await api.delete(
    `/appointments/${id}`
  );
  return response.data;
};