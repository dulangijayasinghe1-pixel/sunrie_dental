import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

import AppointmentForm from "../../components/appointments/AppointmentsForm";
import * as appointmentService from "../../services/appointmentService";
import * as patientService from "../../services/patientService";
import * as dentistService from "../../services/dentistService";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load appointment + patients + dentists
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          appointmentResponse,
          patientResponse,
          dentistResponse,
        ] = await Promise.all([
          appointmentService.getAppointmentById(id),
          patientService.getAllPatients(),
          dentistService.getAllDentists(),
        ]);

        console.log("Appointment response:", appointmentResponse);
        console.log("Patients response:", patientResponse);
        console.log("Dentists response:", dentistResponse);

        setAppointment(appointmentResponse);

        setPatients(
          Array.isArray(patientResponse)
            ? patientResponse
            : []
        );

        setDentists(
          Array.isArray(dentistResponse)
            ? dentistResponse
            : []
        );
      } catch (err) {
        console.error("Failed to load edit data:", err);

        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load appointment data.";

        setError(message);

        alert(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Update appointment
  const handleSubmit = async (data) => {
    console.log("Edit appointment data:", data);

    if (!data.patientId) {
      alert("Please select a patient.");
      toast.error("Please select a patient.");
      return;
    }

    if (!data.dentistId) {
      alert("Please select a dentist.");
      toast.error("Please select a dentist.");
      return;
    }

    if (!data.appointmentDateTime) {
      alert("Please select appointment date and time.");
      toast.error("Please select appointment date and time.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      console.log(
        "Appointment update data sent to backend:",
        data
      );

      await appointmentService.updateAppointment(id, data);

      alert("Appointment updated successfully.");
      toast.success("Appointment updated successfully.");

      navigate(`/appointments/${id}`);
    } catch (err) {
      console.error("Update appointment error:", err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update appointment.";

      setError(message);

      alert(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <span className="loading loading-spinner loading-md"></span>

          <p className="mt-3 text-[#64756C]">
            Loading appointment details...
          </p>
        </div>
      </div>
    );
  }

  // Error / appointment not found
  if (!appointment) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          {error || "Appointment data is not available."}
        </div>

        <button
          type="button"
          onClick={() => navigate("/appointments")}
          className="btn mt-4"
        >
          <FiArrowLeft size={18} />
          Back to Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            navigate(`/appointments/${id}`)
          }
          className="btn btn-ghost mb-3 text-[#64756C]"
        >
          <FiArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#A8C3B2] p-3 text-[#26332D]">
            <FiEdit size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#26332D]">
              Edit Appointment
            </h1>

            <p className="text-[#64756C]">
              Update appointment details
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* No Patients */}
      {patients.length === 0 && (
        <div className="mb-4 rounded-lg bg-yellow-50 p-4 text-yellow-700">
          No patients available.
        </div>
      )}

      {/* No Dentists */}
      {dentists.length === 0 && (
        <div className="mb-4 rounded-lg bg-yellow-50 p-4 text-yellow-700">
          No dentists available.
        </div>
      )}

      {/* Appointment Form */}
      <div className="rounded-xl bg-white p-6 shadow">
        <AppointmentForm
          patients={patients}
          dentists={dentists}
          initialData={appointment}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Update Appointment"
        />
      </div>
    </div>
  );
}

export default EditAppointment;