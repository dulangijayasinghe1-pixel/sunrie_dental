import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiPlus,
  FiEye,
  FiEdit,
  FiCalendar,
  FiXCircle,
  FiCheckCircle,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as appointmentService from "../../services/appointmentService";
import * as patientService from "../../services/patientService";
import * as dentistService from "../../services/dentistService";

function AppointmentList() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD APPOINTMENTS
  // =====================================================

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await appointmentService.getAllAppointments();

      console.log("Appointments response:", response);

      setAppointments(
        Array.isArray(response) ? response : []
      );
    } catch (err) {
      console.error(
        "Failed to load appointments:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to load appointments.";

      setError(message);
      toast.error(message);

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // LOAD PATIENTS
  // =====================================================

  const loadPatients = useCallback(async () => {
    try {
      const response =
        await patientService.getAllPatients();

      console.log("Patients response:", response);

      setPatients(
        Array.isArray(response) ? response : []
      );
    } catch (err) {
      console.error(
        "Failed to load patients:",
        err
      );

      setPatients([]);
    }
  }, []);

  // =====================================================
  // LOAD DENTISTS
  // =====================================================

  const loadDentists = useCallback(async () => {
    try {
      const response =
        await dentistService.getAllDentists();

      console.log("Dentists response:", response);

      setDentists(
        Array.isArray(response) ? response : []
      );
    } catch (err) {
      console.error(
        "Failed to load dentists:",
        err
      );

      setDentists([]);
    }
  }, []);

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadAppointments();
    loadPatients();
    loadDentists();
  }, [
    loadAppointments,
    loadPatients,
    loadDentists,
  ]);

  // =====================================================
  // GET APPOINTMENT ID
  // =====================================================

  const getAppointmentId = (appointment) => {
    return (
      appointment?.id ??
      appointment?.appointmentId
    );
  };

  // =====================================================
  // GET PATIENT ID
  // =====================================================

  const getPatientId = (appointment) => {
    return (
      appointment?.patientId ??
      appointment?.patient?.id ??
      appointment?.patient?.patientId
    );
  };

  // =====================================================
  // GET DENTIST ID
  // =====================================================

  const getDentistId = (appointment) => {
    return (
      appointment?.dentistId ??
      appointment?.dentist?.id ??
      appointment?.dentist?.dentistId
    );
  };

  // =====================================================
  // GET PATIENT NAME
  // =====================================================

  const getPatientName = (appointment) => {
    if (appointment?.patientName) {
      return appointment.patientName;
    }

    if (appointment?.patient?.name) {
      return appointment.patient.name;
    }

    if (appointment?.patient?.fullName) {
      return appointment.patient.fullName;
    }

    const patientId =
      getPatientId(appointment);

    const patient = patients.find(
      (p) =>
        String(
          p?.id ?? p?.patientId
        ) === String(patientId)
    );

    if (patient) {
      if (patient.name) {
        return patient.name;
      }

      if (patient.fullName) {
        return patient.fullName;
      }

      if (
        patient.firstName ||
        patient.lastName
      ) {
        return `${patient.firstName || ""} ${
          patient.lastName || ""
        }`.trim();
      }
    }

    return "-";
  };

  // =====================================================
  // GET DENTIST NAME
  // =====================================================

  const getDentistName = (appointment) => {
    if (appointment?.dentistName) {
      return appointment.dentistName;
    }

    if (appointment?.dentist?.name) {
      return appointment.dentist.name;
    }

    if (appointment?.dentist?.fullName) {
      return appointment.dentist.fullName;
    }

    const dentistId =
      getDentistId(appointment);

    const dentist = dentists.find(
      (d) =>
        String(
          d?.id ?? d?.dentistId
        ) === String(dentistId)
    );

    if (dentist) {
      if (dentist.name) {
        return dentist.name;
      }

      if (dentist.fullName) {
        return dentist.fullName;
      }

      if (
        dentist.firstName ||
        dentist.lastName
      ) {
        return `${dentist.firstName || ""} ${
          dentist.lastName || ""
        }`.trim();
      }
    }

    return "-";
  };

  // =====================================================
  // FORMAT DATE & TIME
  // =====================================================

  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return "-";
    }

    try {
      return new Date(dateTime).toLocaleString(
        "en-LK",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return dateTime;
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
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

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (appointment) => {
    const appointmentId =
      getAppointmentId(appointment);

    if (!appointmentId) {
      toast.error("Appointment ID not found.");
      return;
    }

    navigate(
      `/appointments/${appointmentId}`,
      {
        state: {
          appointment,
          patients,
          dentists,
        },
      }
    );
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (appointment) => {
    const appointmentId =
      getAppointmentId(appointment);

    if (!appointmentId) {
      toast.error("Appointment ID not found.");
      return;
    }

    navigate(
      `/appointments/${appointmentId}/edit`,
      {
        state: {
          appointment,
          patients,
          dentists,
        },
      }
    );
  };

  // =====================================================
  // RESCHEDULE
  // =====================================================

  const handleReschedule = (appointment) => {
    const appointmentId =
      getAppointmentId(appointment);

    if (!appointmentId) {
      toast.error("Appointment ID not found.");
      return;
    }

    navigate(
      `/appointments/${appointmentId}/reschedule`,
      {
        state: {
          appointment,
          patients,
          dentists,
        },
      }
    );
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = (appointment) => {
    const appointmentId =
      getAppointmentId(appointment);

    if (!appointmentId) {
      toast.error("Appointment ID not found.");
      return;
    }

    navigate(
      `/appointments/${appointmentId}/cancel`,
      {
        state: {
          appointment,
          patients,
          dentists,
        },
      }
    );
  };

  // =====================================================
  // COMPLETE
  // =====================================================

  const handleComplete = async (appointment) => {
    const appointmentId =
      getAppointmentId(appointment);

    if (!appointmentId) {
      toast.error("Appointment ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to mark this appointment as completed?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await appointmentService.completeAppointment(
        appointmentId
      );

      toast.success(
        "Appointment completed successfully."
      );

      await loadAppointments();
    } catch (err) {
      console.error(
        "Complete appointment error:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to complete appointment.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (appointment) => {
    const appointmentId =
      getAppointmentId(appointment);

    if (!appointmentId) {
      toast.error("Appointment ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      await appointmentService.deleteAppointment(
        appointmentId
      );

      toast.success(
        "Appointment deleted successfully."
      );

      await loadAppointments();
    } catch (err) {
      console.error(
        "Delete appointment error:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete appointment.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = async () => {
    await Promise.all([
      loadAppointments(),
      loadPatients(),
      loadDentists(),
    ]);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#26332D]">
            Appointments
          </h1>

          <p className="mt-1 text-[#64756C]">
            Manage patient appointments
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="btn btn-outline"
          >
            <FiRefreshCw />
            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/appointments/add")
            }
            className="btn border-none bg-[#5F8D7A] text-white"
          >
            <FiPlus />
            Add Appointment
          </button>

        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div className="mb-4 rounded-lg bg-white p-4 text-center">
          <span className="loading loading-spinner loading-sm"></span>

          <span className="ml-2 text-[#64756C]">
            Loading appointments...
          </span>
        </div>
      )}

      {/* TABLE */}

      <div className="overflow-x-auto rounded-2xl border border-[#A8C3B2] bg-white shadow-sm">

        <table className="table w-full">

          <thead>
            <tr className="bg-[#F7F5EF]">
              <th>Patient</th>
              <th>Dentist</th>
              <th>Date & Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {appointments.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-[#64756C]"
                >
                  No appointments found.
                </td>
              </tr>

            ) : (

              appointments.map(
                (appointment, index) => {

                  const appointmentId =
                    getAppointmentId(
                      appointment
                    );

                  const status =
                    appointment.status?.toUpperCase();

                  return (
                    <tr
                      key={
                        appointmentId ??
                        `appointment-${index}`
                      }
                    >

                      {/* PATIENT */}

                      <td className="font-medium">
                        {getPatientName(
                          appointment
                        )}
                      </td>

                      {/* DENTIST */}

                      <td>
                        {getDentistName(
                          appointment
                        )}
                      </td>

                      {/* DATE */}

                      <td>
                        {formatDateTime(
                          appointment.appointmentDateTime
                        )}
                      </td>

                      {/* REASON */}

                      <td>
                        {appointment.reason || "-"}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            status
                          )}`}
                        >
                          {status || "SCHEDULED"}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="flex justify-center gap-1">

                          {/* VIEW */}

                          <button
                            type="button"
                            title="View"
                            onClick={() =>
                              handleView(
                                appointment
                              )
                            }
                            className="btn btn-sm btn-ghost text-blue-600"
                          >
                            <FiEye />
                          </button>

                          {/* EDIT */}

                          {status !== "COMPLETED" &&
                            status !== "CANCELLED" && (
                              <button
                                type="button"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(
                                    appointment
                                  )
                                }
                                className="btn btn-sm btn-ghost text-[#5F8D7A]"
                              >
                                <FiEdit />
                              </button>
                            )}

                          {/* RESCHEDULE */}

                          {status !== "COMPLETED" &&
                            status !== "CANCELLED" && (
                              <button
                                type="button"
                                title="Reschedule"
                                onClick={() =>
                                  handleReschedule(
                                    appointment
                                  )
                                }
                                className="btn btn-sm btn-ghost text-yellow-600"
                              >
                                <FiCalendar />
                              </button>
                            )}

                          {/* CANCEL */}

                          {status !== "COMPLETED" &&
                            status !== "CANCELLED" && (
                              <button
                                type="button"
                                title="Cancel"
                                onClick={() =>
                                  handleCancel(
                                    appointment
                                  )
                                }
                                className="btn btn-sm btn-ghost text-red-500"
                              >
                                <FiXCircle />
                              </button>
                            )}

                          {/* COMPLETE */}

                          {status !== "COMPLETED" &&
                            status !== "CANCELLED" && (
                              <button
                                type="button"
                                title="Complete"
                                onClick={() =>
                                  handleComplete(
                                    appointment
                                  )
                                }
                                className="btn btn-sm btn-ghost text-green-600"
                              >
                                <FiCheckCircle />
                              </button>
                            )}

                          {/* DELETE */}

                          <button
                            type="button"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                appointment
                              )
                            }
                            className="btn btn-sm btn-ghost text-red-600"
                          >
                            <FiTrash2 />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                }
              )
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AppointmentList;