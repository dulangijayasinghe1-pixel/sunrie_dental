import { useEffect, useState } from "react";

function TreatmentForm({
  patients = [],
  dentists = [],
  appointments = [],
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Treatment",
}) {
  const getPatientId = (patient) =>
    patient?.id ?? patient?.patientId;

  const getDentistId = (dentist) =>
    dentist?.id ?? dentist?.dentistId;

  const getAppointmentId = (appointment) =>
    appointment?.id ?? appointment?.appointmentId;

  const getPatientName = (patient) => {
    if (patient?.name) return patient.name;
    if (patient?.fullName) return patient.fullName;

    const fullName =
      `${patient?.firstName || ""} ${patient?.lastName || ""}`.trim();

    return fullName || `Patient #${getPatientId(patient)}`;
  };

  const getDentistName = (dentist) => {
    if (dentist?.name) return dentist.name;
    if (dentist?.fullName) return dentist.fullName;

    const fullName =
      `${dentist?.firstName || ""} ${dentist?.lastName || ""}`.trim();

    return fullName || `Dentist #${getDentistId(dentist)}`;
  };

  const getAppointmentPatientName = (appointment) =>
    appointment?.patientName ||
    appointment?.patient?.name ||
    appointment?.patient?.fullName ||
    "Patient";

  const getAppointmentDentistName = (appointment) =>
    appointment?.dentistName ||
    appointment?.dentist?.name ||
    appointment?.dentist?.fullName ||
    "Dentist";

  const getAppointmentDateTime = (appointment) =>
    appointment?.appointmentDateTime ||
    appointment?.dateTime ||
    appointment?.date ||
    "";

  const [formData, setFormData] = useState({
    patientId: "",
    dentistId: "",
    appointmentId: "",
    treatmentName: "",
    description: "",
    cost: "",
    status: "ONGOING",
  });

  useEffect(() => {
    const patientId =
      initialData?.patientId ??
      initialData?.patient?.id ??
      initialData?.patient?.patientId;

    const dentistId =
      initialData?.dentistId ??
      initialData?.dentist?.id ??
      initialData?.dentist?.dentistId;

    const appointmentId =
      initialData?.appointmentId ??
      initialData?.appointment?.id ??
      initialData?.appointment?.appointmentId;

    setFormData({
      patientId:
        patientId !== undefined && patientId !== null
          ? String(patientId)
          : "",

      dentistId:
        dentistId !== undefined && dentistId !== null
          ? String(dentistId)
          : "",

      appointmentId:
        appointmentId !== undefined && appointmentId !== null
          ? String(appointmentId)
          : "",

      treatmentName: initialData?.treatmentName || "",
      description: initialData?.description || "",

      cost:
        initialData?.cost !== undefined &&
        initialData?.cost !== null
          ? String(initialData.cost)
          : "",

      status: initialData?.status || "ONGOING",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.patientId) {
      alert("Please select a patient.");
      return;
    }

    if (!formData.dentistId) {
      alert("Please select a dentist.");
      return;
    }

    if (!formData.treatmentName.trim()) {
      alert("Please enter treatment name.");
      return;
    }

    if (!formData.cost || Number(formData.cost) <= 0) {
      alert("Please enter a valid treatment cost.");
      return;
    }

    const treatmentData = {
      patientId: Number(formData.patientId),
      dentistId: Number(formData.dentistId),
      appointmentId: formData.appointmentId
        ? Number(formData.appointmentId)
        : null,
      treatmentName: formData.treatmentName.trim(),
      description: formData.description.trim() || null,
      cost: Number(formData.cost),
      status: formData.status,
    };

    console.log("Treatment payload:", treatmentData);

    onSubmit(treatmentData);
  };

  const statuses = [
    "ONGOING",
    "COMPLETED",
    "CANCELLED",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#D9E4DE] bg-white p-6 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="border-b border-[#E5ECE8] pb-4">
        <h2 className="text-xl font-semibold text-[#26332D]">
          Treatment Information
        </h2>

        <p className="mt-1 text-sm text-[#64756C]">
          Enter the treatment details below.
        </p>
      </div>

      {/* Patient + Dentist */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Patient */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#26332D]">
            Patient <span className="text-red-500">*</span>
          </label>

          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="select select-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] focus:border-[#5F8D7A] focus:outline-none"
          >
            <option value="">Select Patient</option>

            {patients.length === 0 ? (
              <option value="" disabled>
                No patients available
              </option>
            ) : (
              patients.map((patient) => {
                const patientId = getPatientId(patient);

                if (!patientId) return null;

                return (
                  <option
                    key={String(patientId)}
                    value={String(patientId)}
                  >
                    {getPatientName(patient)}
                  </option>
                );
              })
            )}
          </select>

          <p className="mt-1 text-xs text-[#7A8982]">
            {patients.length} patient(s) available
          </p>
        </div>

        {/* Dentist */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#26332D]">
            Dentist <span className="text-red-500">*</span>
          </label>

          <select
            name="dentistId"
            value={formData.dentistId}
            onChange={handleChange}
            required
            className="select select-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] focus:border-[#5F8D7A] focus:outline-none"
          >
            <option value="">Select Dentist</option>

            {dentists.length === 0 ? (
              <option value="" disabled>
                No dentists available
              </option>
            ) : (
              dentists.map((dentist) => {
                const dentistId = getDentistId(dentist);

                if (!dentistId) return null;

                return (
                  <option
                    key={String(dentistId)}
                    value={String(dentistId)}
                  >
                    {getDentistName(dentist)}
                  </option>
                );
              })
            )}
          </select>

          <p className="mt-1 text-xs text-[#7A8982]">
            {dentists.length} dentist(s) available
          </p>
        </div>
      </div>

      {/* Appointment */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#26332D]">
          Appointment
        </label>

        <select
          name="appointmentId"
          value={formData.appointmentId}
          onChange={handleChange}
          className="select select-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] focus:border-[#5F8D7A] focus:outline-none"
        >
          <option value="">No Appointment</option>

          {appointments.length === 0 ? (
            <option value="" disabled>
              No appointments available
            </option>
          ) : (
            appointments.map((appointment) => {
              const appointmentId =
                getAppointmentId(appointment);

              if (!appointmentId) return null;

              return (
                <option
                  key={String(appointmentId)}
                  value={String(appointmentId)}
                >
                  {getAppointmentPatientName(appointment)} -{" "}
                  {getAppointmentDentistName(appointment)} -{" "}
                  {getAppointmentDateTime(appointment)}
                </option>
              );
            })
          )}
        </select>

        <p className="mt-1 text-xs text-[#7A8982]">
          {appointments.length} appointment(s) available
        </p>
      </div>

      {/* Treatment Name */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#26332D]">
          Treatment Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          name="treatmentName"
          value={formData.treatmentName}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={150}
          placeholder="e.g. Dental Cleaning"
          className="input input-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] placeholder:text-[#9AA8A1] focus:border-[#5F8D7A] focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#26332D]">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={1000}
          rows={4}
          placeholder="Enter treatment description..."
          className="textarea textarea-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] placeholder:text-[#9AA8A1] focus:border-[#5F8D7A] focus:outline-none"
        />
      </div>

      {/* Cost + Status */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Cost */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#26332D]">
            Treatment Cost (LKR){" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            placeholder="e.g. 5000"
            className="input input-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] placeholder:text-[#9AA8A1] focus:border-[#5F8D7A] focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#26332D]">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered w-full bg-white border-[#C8D8D0] text-[#26332D] focus:border-[#5F8D7A] focus:outline-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-[#E5ECE8] pt-5">
        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-[#5F8D7A] text-white shadow-sm hover:bg-[#4F7968] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving Treatment..." : submitText}
        </button>
      </div>
    </form>
  );
}

export default TreatmentForm;