import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiXCircle,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as appointmentService from "../../services/appointmentService";

function CancelAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const appointment =
    location.state?.appointment || null;

  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  const patientName =
    appointment.patientName ||
    appointment.patient?.name ||
    "-";

  const dentistName =
    appointment.dentistName ||
    appointment.dentist?.name ||
    "-";

  const handleCancel = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      alert(
        "Cancellation reason is required."
      );

      toast.error(
        "Cancellation reason is required."
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await appointmentService.cancelAppointment(
        id,
        {
          reason: reason.trim(),
        }
      );

      alert(
        "Appointment cancelled successfully."
      );

      toast.success(
        "Appointment cancelled successfully."
      );

      navigate("/appointments");

    } catch (err) {
      console.error(
        "Cancel appointment error:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to cancel appointment.";

      setError(message);
      alert(message);
      toast.error(message);

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="mb-6">

        <button
          type="button"
          onClick={() =>
            navigate(
              `/appointments/${id}`,
              {
                state: {
                  appointment,
                },
              }
            )
          }
          className="btn btn-ghost mb-3"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-red-100 p-3 text-red-600">
            <FiXCircle size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#26332D]">
              Cancel Appointment
            </h1>

            <p className="text-[#64756C]">
              Cancel this patient appointment
            </p>
          </div>

        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* APPOINTMENT */}

      <div className="mb-6 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-lg font-semibold">
          Appointment Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

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
              Dentist
            </p>

            <p className="font-semibold">
              {dentistName}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Date & Time
            </p>

            <p className="font-semibold">
              {appointment.appointmentDateTime
                ? new Date(
                    appointment.appointmentDateTime
                  ).toLocaleString("en-LK")
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#64756C]">
              Status
            </p>

            <p className="font-semibold">
              {appointment.status || "SCHEDULED"}
            </p>
          </div>

        </div>
      </div>

      {/* CANCEL FORM */}

      <div className="rounded-xl bg-white p-6 shadow">

        <form
          onSubmit={handleCancel}
          className="space-y-5"
        >

          <div>
            <label className="mb-1 block text-sm font-medium">
              Cancellation Reason *
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              maxLength={500}
              rows={5}
              required
              className="textarea textarea-bordered w-full"
              placeholder="Enter cancellation reason"
            />

            <p className="mt-1 text-right text-xs text-[#64756C]">
              {reason.length}/500
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                navigate(
                  `/appointments/${id}`,
                  {
                    state: {
                      appointment,
                    },
                  }
                )
              }
              className="btn btn-ghost"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={saving}
              className="btn btn-error text-white"
            >
              {saving
                ? "Cancelling..."
                : "Cancel Appointment"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CancelAppointment;