import api from "./api";

// Generate report for a date range
export const generateReport = async (startDate, endDate) => {
  const response = await api.get("/reports", {
    params: {
      startDate,
      endDate,
    },
  });

  return response.data;
};