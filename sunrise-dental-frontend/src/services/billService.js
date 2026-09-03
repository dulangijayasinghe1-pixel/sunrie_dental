import api from "./api";

// Create Bill
export const createBill = async (data) => {
  const response = await api.post("/bills", data);
  return response.data;
};

// Get Bill By ID
export const getBillById = async (id) => {
  const response = await api.get(`/bills/${id}`);
  return response.data;
};

// Get All Bills
export const getAllBills = async () => {
  const response = await api.get("/bills");
  return response.data;
};

// Get Bills By Patient
export const getBillsByPatient = async (patientId) => {
  const response = await api.get(
    `/bills/patient/${patientId}`
  );

  return response.data;
};

// Get Bills By Appointment
export const getBillsByAppointment = async (appointmentId) => {
  const response = await api.get(
    `/bills/appointment/${appointmentId}`
  );

  return response.data;
};

// Get Bills By Payment Status
export const getBillsByPaymentStatus = async (status) => {
  const response = await api.get(
    `/bills/status/${status}`
  );

  return response.data;
};

// Update Bill
export const updateBill = async (id, data) => {
  const response = await api.put(
    `/bills/${id}`,
    data
  );

  return response.data;
};

// Mark Bill As Paid
export const markBillAsPaid = async (id) => {
  const response = await api.patch(
    `/bills/${id}/pay`
  );

  return response.data;
};

// Cancel Bill
export const cancelBill = async (id) => {
  const response = await api.patch(
    `/bills/${id}/cancel`
  );

  return response.data;
};

// Delete Bill
export const deleteBill = async (id) => {
  const response = await api.delete(
    `/bills/${id}`
  );

  return response.data;
};

// Get Total Revenue
export const getTotalRevenue = async () => {
  const response = await api.get(
    "/bills/revenue"
  );

  return response.data;
};

// Get Pending Amount
export const getPendingAmount = async () => {
  const response = await api.get(
    "/bills/pending-amount"
  );

  return response.data;
};

// Print Bill PDF
export const printBill = async (id) => {
  const response = await api.get(
    `/bills/${id}/print`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};