import api from "./api";

// Register Staff
export const registerStaff = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Verify Email
export const verifyEmail = async (data) => {
  const response = await api.post("/auth/verify-email", data);
  return response.data;
};

// Login
export const loginStaff = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

// Verify Reset OTP
export const verifyResetOtp = async (data) => {
  const response = await api.post("/auth/verify-reset-otp", data);
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

// Change Password
export const changePassword = async (data) => {
  const response = await api.post("/auth/change-password", data);
  return response.data;
};

// Logout
export const logoutStaff = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};