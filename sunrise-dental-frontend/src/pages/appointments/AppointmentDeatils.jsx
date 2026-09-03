import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiCalendar,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as appointmentService from "../../services/appointmentService";

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const appointment = location.state?.appointment || null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const appointmentId =
    appointment?.id ??
    appointment?.appointmentId ??
    id;

  const patientName =
    appointment?.patientName ||
    appointment?.patient?.name ||
    appointment?.patient?.fullName ||
    "-";

  const dentistName =
    appointment?.dentistName ||
    appointment?.dentist?.name ||
    appointment?.dentist?.fullName ||
    "-";

  const patientId =
    appointment?.patientId ??
    appointment?.patient?.id ??
    "-";

  const dentistId =
    appointment?.dentistId ??
    appointment?.dentist?.id ??
    "-";

  const status =
    appointment?.status?.toUpperCase() ||
    "SCHEDULED";

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";

    return new Date(dateTime).toLocaleString(
      "en-LK"
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "RESCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==============================
  // COMPLETE
  // ==============================

  const handleComplete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this appointment as completed?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await appointmentService.completeAppointment(
        appointmentId
      );

      alert(
        "Appointment completed successfully."
      );

      toast.success(
        "Appointment completed successfully."
      );

      navigate("/appointments");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to complete appointment.";

      setError(message);
      alert(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await appointmentService.deleteAppointment(
        appointmentId
      );

      alert(
        "Appointment deleted successfully."
      );

      toast.success(
        "Appointment deleted successfully."
      );

      navigate("/appointments");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete appointment.";

      setError(message);
      alert(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // NO DATA
  // ==============================

  if (!appointment) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          Appointment data is not available.
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/appointments")
          }
          className="btn mt-4"
        >
          <FiArrowLeft />
          Back to Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="mb-6">

        <button
          type="button"
          onClick={() =>
            navigate("/appointments")
          }
          className="btn btn-ghost mb-3"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-[#26332D]">
              Appointment Details
            </h1>

            <p className="mt-1 text-[#64756C]">
              Appointment #{appointmentId}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
              status
            )}`}
          >
            {status}
          </span>

        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* DETAILS */}

      <div className="rounded-xl bg-white p-6 shadow">

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-[#64756C]">
              Patient
            </p>
            <p className="font-semibold">
              {patientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Patient ID
            </p>
            <p className="font-semibold">
              {patientId}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Dentist
            </p>
            <p className="font-semibold">
              {dentistName}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Dentist ID
            </p>
            <p className="font-semibold">
              {dentistId}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Appointment Date & Time
            </p>
            <p className="font-semibold">
              {formatDateTime(
                appointment.appointmentDateTime
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Status
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-[#64756C]">
              Reason
            </p>
            <p>
              {appointment.reason ||
                "No reason provided."}
            </p>
          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="mt-8 flex flex-wrap gap-3 border-t pt-6">

          {status !== "COMPLETED" &&
            status !== "CANCELLED" && (
              <>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    navigate(
                      `/appointments/${appointmentId}/edit`,
                      {
                        state: {
                          appointment,
                        },
                      }
                    )
                  }
                  className="btn bg-[#5F8D7A] text-white"
                >
                  <FiEdit />
                  Edit
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    navigate(
                      `/appointments/${appointmentId}/reschedule`,
                      {
                        state: {
                          appointment,
                        },
                      }
                    )
                  }
                  className="btn bg-[#5F8D7A] text-white"
                >
                  <FiCalendar />
                  Reschedule
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleComplete}
                  className="btn btn-success"
                >
                  <FiCheck />
                  Complete
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    navigate(
                      `/appointments/${appointmentId}/cancel`,
                      {
                        state: {
                          appointment,
                        },
                      }
                    )
                  }
                  className="btn btn-error"
                >
                  <FiX />
                  Cancel
                </button>
              </>
            )}

          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="btn btn-outline btn-error"
          >
            <FiTrash2 />
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;