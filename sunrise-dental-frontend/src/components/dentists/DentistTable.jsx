import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function DentistTable({
  dentists = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#A8C3B2] bg-white shadow-sm">
      <table className="table w-full">
        <thead>
          <tr className="bg-[#F7F5EF] text-[#26332D]">
            <th>Dentist Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Registration Number</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {dentists.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="py-10 text-center text-[#64756C]"
              >
                No dentists found.
              </td>
            </tr>
          ) : (
            dentists.map((dentist, index) => {
              const dentistId =
                dentist.id ?? dentist.dentistId;

              return (
                <tr
                  key={dentistId ?? `dentist-${index}`}
                  className="hover:bg-[#F7F5EF]"
                >
                  <td>
                    <span className="font-medium text-[#26332D]">
                      {dentist.name || "-"}
                    </span>
                  </td>

                  <td className="text-[#64756C]">
                    {dentist.email || "-"}
                  </td>

                  <td className="text-[#64756C]">
                    {dentist.phone || "-"}
                  </td>

                  <td className="text-[#64756C]">
                    {dentist.specialization || "-"}
                  </td>

                  <td className="text-[#64756C]">
                    {dentist.registrationNumber || "-"}
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView?.(dentist)}
                        className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                        title="View Dentist"
                      >
                        <FiEye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit?.(dentist)}
                        className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                        title="Edit Dentist"
                      >
                        <FiEdit2 size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete?.(dentist)}
                        className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                        title="Delete Dentist"
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

export default DentistTable;