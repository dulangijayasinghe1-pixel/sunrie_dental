import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as appointmentService from "../../services/appointmentService";

function RescheduleAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const appointment =
    location.state?.appointment || null;

  const [newAppointmentDateTime, setNewAppointmentDateTime] =
    useState("");

  const [reason, setReason] = useState(
    appointment?.reason || ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newAppointmentDateTime) {
      alert(
        "Please select a new appointment date and time."
      );

      toast.error(
        "New appointment date and time is required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = {
        newAppointmentDateTime,
        reason: reason.trim() || null,
      };

      console.log(
        "Reschedule data:",
        data
      );

      await appointmentService.rescheduleAppointment(
        id,
        data
      );

      alert(
        "Appointment rescheduled successfully."
      );

      toast.success(
        "Appointment rescheduled successfully."
      );

      navigate("/appointments");

    } catch (err) {
      console.error(
        "Reschedule error:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to reschedule appointment.";

      setError(message);
      alert(message);
      toast.error(message);

    } finally {
      setSaving(false);
    }
  };

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

          <div className="rounded-lg bg-[#A8C3B2] p-3">
            <FiCalendar size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#26332D]">
              Reschedule Appointment
            </h1>

            <p className="text-[#64756C]">
              Change appointment date and time
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

      {/* CURRENT APPOINTMENT */}

      <div className="mb-6 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-lg font-semibold">
          Current Appointment
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
              Current Date & Time
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
              {appointment.status || "-"}
            </p>
          </div>

        </div>
      </div>

      {/* FORM */}

      <div className="rounded-xl bg-white p-6 shadow">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="mb-1 block text-sm font-medium">
              New Date & Time *
            </label>

            <input
              type="datetime-local"
              value={newAppointmentDateTime}
              onChange={(e) =>
                setNewAppointmentDateTime(
                  e.target.value
                )
              }
              min={getMinDateTime()}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              maxLength={500}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Enter reason"
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
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="btn border-0 bg-[#5F8D7A] text-white"
            >
              {saving
                ? "Rescheduling..."
                : "Reschedule Appointment"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default RescheduleAppointment;