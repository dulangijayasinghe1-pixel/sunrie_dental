import { useState } from "react";
import { toast } from "react-toastify";

function AppointmentForm({
  patients = [],
  dentists = [],
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Appointment",
}) {
  // Get patient ID regardless of backend field name
  const getPatientId = (patient) => {
    return patient?.id ?? patient?.patientId;
  };

  // Get dentist ID regardless of backend field name
  const getDentistId = (dentist) => {
    return dentist?.id ?? dentist?.dentistId;
  };

  // Get patient name
  const getPatientName = (patient) => {
    if (patient?.name) {
      return patient.name;
    }

    if (patient?.fullName) {
      return patient.fullName;
    }

    if (patient?.firstName || patient?.lastName) {
      return `${patient?.firstName || ""} ${
        patient?.lastName || ""
      }`.trim();
    }

    return "Unknown Patient";
  };

  // Get dentist name
  const getDentistName = (dentist) => {
    if (dentist?.name) {
      return dentist.name;
    }

    if (dentist?.fullName) {
      return dentist.fullName;
    }

    if (dentist?.firstName || dentist?.lastName) {
      return `${dentist?.firstName || ""} ${
        dentist?.lastName || ""
      }`.trim();
    }

    return "Unknown Dentist";
  };

  const [patientId, setPatientId] = useState(
    initialData.patientId
      ? String(initialData.patientId)
      : ""
  );

  const [dentistId, setDentistId] = useState(
    initialData.dentistId
      ? String(initialData.dentistId)
      : ""
  );

  const [appointmentDateTime, setAppointmentDateTime] =
    useState(
      initialData.appointmentDateTime
        ? initialData.appointmentDateTime.slice(0, 16)
        : ""
    );

  const [reason, setReason] = useState(
    initialData.reason || ""
  );

  // Patient change
  const handlePatientChange = (e) => {
    const value = e.target.value;

    console.log("Patient selected:", value);

    setPatientId(value);
  };

  // Dentist change
  const handleDentistChange = (e) => {
    const value = e.target.value;

    console.log("Dentist selected:", value);

    setDentistId(value);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Patient ID:", patientId);
    console.log("Dentist ID:", dentistId);
    console.log(
      "Date Time:",
      appointmentDateTime
    );

    // Patient validation
    if (!patientId) {
      alert("Please select a patient.");
      toast.error("Please select a patient.");
      return;
    }

    // Dentist validation
    if (!dentistId) {
      alert("Please select a dentist.");
      toast.error("Please select a dentist.");
      return;
    }

    // Date/time validation
    if (!appointmentDateTime) {
      alert("Please select appointment date and time.");
      toast.error(
        "Please select appointment date and time."
      );
      return;
    }

    const appointmentData = {
      patientId: Number(patientId),
      dentistId: Number(dentistId),
      appointmentDateTime: appointmentDateTime,
      reason: reason.trim() || null,
    };

    console.log(
      "Final Appointment Data:",
      appointmentData
    );

    onSubmit(appointmentData);
  };

  // Minimum date/time
  const getMinDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();

    const month = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      now.getDate()
    ).padStart(2, "0");

    const hours = String(
      now.getHours()
    ).padStart(2, "0");

    const minutes = String(
      now.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Appointment Details */}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
          Appointment Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* =========================
              PATIENT
          ========================== */}

          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Patient *
            </label>

            <select
              name="patientId"
              value={patientId}
              onChange={handlePatientChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">
                Select patient
              </option>

              {patients.map((patient, index) => {
                const id = getPatientId(patient);

                return (
                  <option
                    key={
                      id !== undefined
                        ? `patient-${id}`
                        : `patient-${index}`
                    }
                    value={
                      id !== undefined
                        ? String(id)
                        : ""
                    }
                  >
                    {getPatientName(patient)}
                  </option>
                );
              })}
            </select>

            {patients.length === 0 && (
              <p className="mt-1 text-xs text-red-500">
                No patients available.
              </p>
            )}
          </div>

          {/* =========================
              DENTIST
          ========================== */}

          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Dentist *
            </label>

            <select
              name="dentistId"
              value={dentistId}
              onChange={handleDentistChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">
                Select dentist
              </option>

              {dentists.map((dentist, index) => {
                const id = getDentistId(dentist);

                return (
                  <option
                    key={
                      id !== undefined
                        ? `dentist-${id}`
                        : `dentist-${index}`
                    }
                    value={
                      id !== undefined
                        ? String(id)
                        : ""
                    }
                  >
                    {getDentistName(dentist)}

                    {dentist?.specialization
                      ? ` - ${dentist.specialization}`
                      : ""}
                  </option>
                );
              })}
            </select>

            {dentists.length === 0 && (
              <p className="mt-1 text-xs text-red-500">
                No dentists available.
              </p>
            )}
          </div>

          {/* =========================
              DATE & TIME
          ========================== */}

          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Appointment Date & Time *
            </label>

            <input
              type="datetime-local"
              name="appointmentDateTime"
              value={appointmentDateTime}
              onChange={(e) =>
                setAppointmentDateTime(
                  e.target.value
                )
              }
              required
              min={getMinDateTime()}
              className="input input-bordered w-full"
            />
          </div>

          {/* =========================
              REASON
          ========================== */}

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Reason
            </label>

            <textarea
              name="reason"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              maxLength={500}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Enter reason for appointment"
            />

            <p className="mt-1 text-right text-xs text-[#64756C]">
              {reason.length}/500
            </p>
          </div>
        </div>
      </div>

      {/* Submit */}

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

export default AppointmentForm;