import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

function PatientTable({
  patients = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#A8C3B2] bg-white shadow-sm">
      <table className="table w-full">

        {/* Table Header */}
        <thead>
          <tr className="bg-[#F7F5EF] text-[#26332D]">
            <th>Patient Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="py-10 text-center text-[#64756C]"
              >
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-[#F7F5EF]"
              >
                {/* Name */}
                <td>
                  <div className="font-medium text-[#26332D]">
                    {patient.name}
                  </div>
                </td>

                {/* Phone */}
                <td className="text-[#64756C]">
                  {patient.phone || "-"}
                </td>

                {/* Email */}
                <td className="text-[#64756C]">
                  {patient.email || "-"}
                </td>

                {/* Gender */}
                <td className="text-[#64756C]">
                  {patient.gender || "-"}
                </td>

                {/* Age */}
                <td>
                  <span className="font-medium text-[#5F8D7A]">
                    {patient.age !== null &&
                    patient.age !== undefined
                      ? patient.age
                      : "-"}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-center gap-2">

                    {/* View */}
                    <button
                      type="button"
                      onClick={() => onView(patient)}
                      className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                      title="View Patient"
                    >
                      <FiEye size={17} />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => onEdit(patient)}
                      className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                      title="Edit Patient"
                    >
                      <FiEdit2 size={17} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(patient)}
                      className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                      title="Delete Patient"
                    >
                      <FiTrash2 size={17} />
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

export default PatientTable;