import {
  FiEye,
  FiEdit2,
  FiCheck,
  FiX,
  FiTrash2,
} from "react-icons/fi";

function AppointmentTable({
  appointments = [],
  onView,
  onReschedule,
  onComplete,
  onCancel,
  onDelete,
}) {
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";

    return new Date(dateTime).toLocaleString("en-LK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-[#A8C3B2] text-[#26332D]";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "RESCHEDULED":
        return "bg-yellow-100 text-yellow-700";

      case "NO_SHOW":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#A8C3B2] bg-white shadow-sm">
      <table className="table w-full">

        {/* Header */}
        <thead>
          <tr className="bg-[#F7F5EF] text-[#26332D]">
            <th>Patient</th>
            <th>Dentist</th>
            <th>Date & Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        {/* Body */}
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
            appointments.map((appointment) => (
              <tr
                key={appointment.appointmentId}
                className="hover:bg-[#F7F5EF]"
              >

                {/* Patient */}
                <td>
                  <span className="font-medium text-[#26332D]">
                    {appointment.patientName || "-"}
                  </span>
                </td>

                {/* Dentist */}
                <td className="text-[#64756C]">
                  {appointment.dentistName || "-"}
                </td>

                {/* Date & Time */}
                <td className="whitespace-nowrap text-[#64756C]">
                  {formatDateTime(
                    appointment.appointmentDateTime
                  )}
                </td>

                {/* Reason */}
                <td className="max-w-xs text-[#64756C]">
                  {appointment.reason || "-"}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge border-none ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status || "-"}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-center gap-1">

                    {/* View */}
                    <button
                      type="button"
                      onClick={() => onView(appointment)}
                      className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                      title="View"
                    >
                      <FiEye size={16} />
                    </button>

                    {/* Reschedule */}
                    {appointment.status !== "COMPLETED" &&
                      appointment.status !== "CANCELLED" && (
                        <button
                          type="button"
                          onClick={() =>
                            onReschedule(appointment)
                          }
                          className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                          title="Reschedule"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      )}

                    {/* Complete */}
                    {appointment.status !== "COMPLETED" &&
                      appointment.status !== "CANCELLED" && (
                        <button
                          type="button"
                          onClick={() =>
                            onComplete(appointment)
                          }
                          className="btn btn-sm btn-ghost text-green-600 hover:bg-green-50"
                          title="Complete"
                        >
                          <FiCheck size={16} />
                        </button>
                      )}

                    {/* Cancel */}
                    {appointment.status !== "CANCELLED" &&
                      appointment.status !== "COMPLETED" && (
                        <button
                          type="button"
                          onClick={() =>
                            onCancel(appointment)
                          }
                          className="btn btn-sm btn-ghost text-orange-500 hover:bg-orange-50"
                          title="Cancel"
                        >
                          <FiX size={16} />
                        </button>
                      )}

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        onDelete(appointment)
                      }
                      className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>

                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;