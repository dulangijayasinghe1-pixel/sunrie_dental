import { useState } from "react";

function BillForm({
  patients = [],
  treatments = [],
  appointments = [],
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Create Bill",
}) {
  const [formData, setFormData] = useState({
    patientId: initialData.patientId
      ? String(initialData.patientId)
      : "",

    treatmentId: initialData.treatmentId
      ? String(initialData.treatmentId)
      : "",

    appointmentId: initialData.appointmentId
      ? String(initialData.appointmentId)
      : "",

    amount: initialData.amount ?? "",
    discount: initialData.discount ?? "",
    description: initialData.description || "",
    paymentStatus: initialData.paymentStatus || "PENDING",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const billData = {
      patientId: Number(formData.patientId),
      treatmentId: Number(formData.treatmentId),

      appointmentId: formData.appointmentId
        ? Number(formData.appointmentId)
        : null,

      amount: Number(formData.amount),

      discount: formData.discount
        ? Number(formData.discount)
        : 0,

      description: formData.description.trim() || null,

      paymentStatus: formData.paymentStatus || "PENDING",
    };

    onSubmit(billData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* BILL DETAILS */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
          Bill Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Patient */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Patient *
            </label>

            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select patient</option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {/* Treatment */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Treatment *
            </label>

            <select
              name="treatmentId"
              value={formData.treatmentId}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select treatment</option>

              {treatments.map((treatment) => (
                <option
                  key={treatment.id}
                  value={treatment.id}
                >
                  {treatment.treatmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Appointment
            </label>

            <select
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">
                No appointment
              </option>

              {appointments.map((appointment) => (
                <option
                  key={appointment.appointmentId}
                  value={appointment.appointmentId}
                >
                  {appointment.patientName || "Patient"} -{" "}
                  {appointment.dentistName || "Dentist"} -{" "}
                  {appointment.appointmentDateTime
                    ? new Date(
                        appointment.appointmentDateTime
                      ).toLocaleString("en-LK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "No date"}
                </option>
              ))}
            </select>

            <p className="mt-1 text-xs text-[#64756C]">
              Optional
            </p>
          </div>

          {/* Amount */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Amount *
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Discount
            </label>

            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="input input-bordered w-full"
              placeholder="Enter discount"
            />

            <p className="mt-1 text-xs text-[#64756C]">
              Optional
            </p>
          </div>

          {/* Payment Status */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Payment Status
            </label>

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Enter bill description"
            />

            <p className="mt-1 text-right text-xs text-[#64756C]">
              {formData.description.length}/500
            </p>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn border-none bg-[#5F8D7A] px-6 text-white hover:bg-[#4F7968]"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Saving...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
}

export default BillForm;