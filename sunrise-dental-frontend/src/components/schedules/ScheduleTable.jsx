import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function ScheduleTable({
  schedules = [],
  onView,
  onEdit,
  onDelete,
  onToggleAvailability,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#A8C3B2] bg-white shadow-sm">
      <table className="table w-full">
        <thead>
          <tr className="bg-[#F7F5EF] text-[#26332D]">
            <th>Dentist</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Available</th>
            <th>Notes</th>
            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {schedules.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="py-10 text-center text-[#64756C]"
              >
                No schedules found.
              </td>
            </tr>
          ) : (
            schedules.map((schedule) => {
              const scheduleId =
                schedule.scheduleId ?? schedule.id;

              const dentistName =
                schedule.dentistName ||
                schedule.dentist?.name ||
                "-";

              const day = schedule.dayOfWeek
                ? schedule.dayOfWeek.charAt(0) +
                  schedule.dayOfWeek
                    .slice(1)
                    .toLowerCase()
                : "-";

              return (
                <tr
                  key={scheduleId}
                  className="hover:bg-[#F7F5EF]"
                >
                  {/* Dentist */}
                  <td>
                    <span className="font-medium text-[#26332D]">
                      {dentistName}
                    </span>
                  </td>

                  {/* Day */}
                  <td className="text-[#64756C]">
                    {day}
                  </td>

                  {/* Start */}
                  <td className="text-[#64756C]">
                    {schedule.startTime || "-"}
                  </td>

                  {/* End */}
                  <td className="text-[#64756C]">
                    {schedule.endTime || "-"}
                  </td>

                  {/* Available */}
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        onToggleAvailability &&
                        onToggleAvailability(schedule)
                      }
                      className={`badge cursor-pointer border-0 px-3 py-3 ${
                        schedule.available
                          ? "bg-[#A8C3B2] text-[#26332D]"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {schedule.available
                        ? "Available"
                        : "Unavailable"}
                    </button>
                  </td>

                  {/* Notes */}
                  <td className="max-w-[200px] truncate text-[#64756C]">
                    {schedule.notes || "-"}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          onView &&
                          onView(schedule)
                        }
                        className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                        title="View Schedule"
                      >
                        <FiEye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit &&
                          onEdit(schedule)
                        }
                        className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                        title="Edit Schedule"
                      >
                        <FiEdit2 size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          onDelete &&
                          onDelete(schedule)
                        }
                        className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                        title="Delete Schedule"
                      >
                        <FiTrash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;