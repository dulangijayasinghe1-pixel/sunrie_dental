import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function TreatmentTable({
  treatments = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#A8C3B2] bg-white shadow-sm">

      <table className="table w-full">

        {/* Header */}
        <thead>
          <tr className="bg-[#F7F5EF] text-[#26332D]">
            <th>Treatment</th>
            <th>Patient</th>
            <th>Dentist</th>
            <th>Cost</th>
            <th>Status</th>
            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>

          {treatments.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="py-10 text-center text-[#64756C]"
              >
                No treatments found.
              </td>
            </tr>
          ) : (
            treatments.map((treatment) => {

              const treatmentId =
                treatment.treatmentId;

              return (
                <tr
                  key={treatmentId}
                  className="hover:bg-[#F7F5EF]"
                >

                  <td>
                    <span className="font-medium text-[#26332D]">
                      {treatment.treatmentName ||
                        "-"}
                    </span>
                  </td>

                  <td className="text-[#64756C]">
                    {treatment.patientName ||
                      "-"}
                  </td>

                  <td className="text-[#64756C]">
                    {treatment.dentistName ||
                      "-"}
                  </td>

                  <td className="text-[#64756C]">
                    {treatment.cost !==
                    null &&
                    treatment.cost !==
                    undefined
                      ? `Rs. ${Number(
                          treatment.cost
                        ).toLocaleString(
                          "en-LK",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}`
                      : "-"}
                  </td>

                  <td>
                    <span className="badge border-none bg-[#A8C3B2] text-[#26332D]">
                      {treatment.status ||
                        "-"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex items-center justify-center gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          onView(treatment)
                        }
                        className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                        title="View Treatment"
                      >
                        <FiEye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(treatment)
                        }
                        className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                        title="Edit Treatment"
                      >
                        <FiEdit2 size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(treatment)
                        }
                        className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                        title="Delete Treatment"
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

export default TreatmentTable;