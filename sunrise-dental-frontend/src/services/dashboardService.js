import api from "./api";

// Get dashboard summary
export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard");

  return response.data;
};