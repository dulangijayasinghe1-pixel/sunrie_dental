import api from "./api";

// Create dentist schedule
export const createSchedule = async (data) => {
  const response = await api.post(
    "/dentist-schedules",
    data
  );

  return response.data;
};

// Get schedule by ID
export const getScheduleById = async (id) => {
  const response = await api.get(
    `/dentist-schedules/${id}`
  );

  return response.data;
};

// Get all schedules
export const getAllSchedules = async () => {
  const response = await api.get(
    "/dentist-schedules"
  );

  return response.data;
};

// Get schedules by dentist
export const getSchedulesByDentist = async (dentistId) => {
  const response = await api.get(
    `/dentist-schedules/dentist/${dentistId}`
  );

  return response.data;
};

// Update schedule
export const updateSchedule = async (id, data) => {
  const response = await api.put(
    `/dentist-schedules/${id}`,
    data
  );

  return response.data;
};

// Delete schedule
export const deleteSchedule = async (id) => {
  const response = await api.delete(
    `/dentist-schedules/${id}`
  );

  return response.data;
};

// Update schedule availability
export const updateScheduleAvailability = async (
  id,
  available
) => {
  const response = await api.patch(
    `/dentist-schedules/${id}/availability`,
    null,
    {
      params: {
        available,
      },
    }
  );

  return response.data;
};