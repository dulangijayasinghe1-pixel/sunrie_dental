import api from "./api";

// Get my staff profile
export const getMyProfile = async () => {
  const response = await api.get("/staff/profile");
  return response.data;
};

// Update my staff profile
export const updateMyProfile = async (data) => {
  const response = await api.put("/staff/profile", data);
  return response.data;
};