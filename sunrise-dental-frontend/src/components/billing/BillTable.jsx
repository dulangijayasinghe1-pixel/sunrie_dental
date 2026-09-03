import {
  FiEye,
  FiEdit2,
  FiCheck,
  FiX,
  FiTrash2,
  FiPrinter,
} from "react-icons/fi";

function BillTable({
  bills = [],
  onView,
  onEdit,
  onPay,
  onCancel,
  onDelete,
  onPrint,
}) {
  const formatCurrency = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "-";
    }

    return `Rs. ${Number(value).toLocaleString(
      "en-LK",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const formatDate = (dateTime) => {
    if (!dateTime) {
      return "-";
    }

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-LK", {
      dateStyle: "medium",
    });
  };

  const getStatusClass = (status) => {
    switch (
      status?.toUpperCase()
    ) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getBillId = (bill) => {
    return bill?.billId ?? bill?.id;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#A8C3B2] bg-white shadow-sm">

      <table className="table w-full">

        {/* HEADER */}
        <thead>
          <tr className="bg-[#F7F5EF] text-[#26332D]">

            <th>Bill ID</th>
            <th>Patient</th>
            <th>Treatment</th>
            <th>Bill Date</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Status</th>
            <th className="text-center">
              Actions
            </th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {bills.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                className="py-10 text-center text-[#64756C]"
              >
                No bills found.
              </td>
            </tr>
          ) : (
            bills.map((bill) => {

              const billId =
                getBillId(bill);

              const status =
                bill?.paymentStatus?.toUpperCase();

              return (
                <tr
                  key={billId}
                  className="hover:bg-[#F7F5EF]"
                >

                  {/* BILL ID */}
                  <td>
                    <span className="font-semibold text-[#5F8D7A]">
                      #{billId}
                    </span>
                  </td>

                  {/* PATIENT */}
                  <td>
                    <div className="font-medium text-[#26332D]">
                      {bill.patientName || "-"}
                    </div>

                    {bill.patientEmail && (
                      <div className="text-xs text-[#64756C]">
                        {bill.patientEmail}
                      </div>
                    )}
                  </td>

                  {/* TREATMENT */}
                  <td className="text-[#64756C]">
                    {bill.treatmentName || "-"}
                  </td>

                  {/* BILL DATE */}
                  <td className="whitespace-nowrap text-[#64756C]">
                    {formatDate(
                      bill.billDate
                    )}
                  </td>

                  {/* AMOUNT */}
                  <td className="whitespace-nowrap text-[#64756C]">
                    {formatCurrency(
                      bill.amount
                    )}
                  </td>

                  {/* DISCOUNT */}
                  <td className="whitespace-nowrap text-[#64756C]">
                    {formatCurrency(
                      bill.discount
                    )}
                  </td>

                  {/* TOTAL */}
                  <td>
                    <span className="font-semibold text-[#26332D]">
                      {formatCurrency(
                        bill.totalAmount
                      )}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`badge border-none ${getStatusClass(
                        status
                      )}`}
                    >
                      {bill.paymentStatus ||
                        "-"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="flex items-center justify-center gap-1">

                      {/* VIEW */}
                      <button
                        type="button"
                        onClick={() =>
                          onView(bill)
                        }
                        className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                        title="View Bill"
                      >
                        <FiEye size={16} />
                      </button>

                      {/* EDIT */}
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() =>
                            onEdit(bill)
                          }
                          className="btn btn-sm btn-ghost text-[#5F8D7A] hover:bg-[#A8C3B2]"
                          title="Edit Bill"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      )}

                      {/* PRINT */}
                      <button
                        type="button"
                        onClick={() =>
                          onPrint(bill)
                        }
                        className="btn btn-sm btn-ghost text-purple-600 hover:bg-purple-50"
                        title="Print Bill"
                      >
                        <FiPrinter
                          size={16}
                        />
                      </button>

                      {/* PAY */}
                      {status === "PENDING" && (
                        <button
                          type="button"
                          onClick={() =>
                            onPay(bill)
                          }
                          className="btn btn-sm btn-ghost text-green-600 hover:bg-green-50"
                          title="Mark as Paid"
                        >
                          <FiCheck
                            size={16}
                          />
                        </button>
                      )}

                      {/* CANCEL */}
                      {status !== "CANCELLED" &&
                        status !== "PAID" && (
                          <button
                            type="button"
                            onClick={() =>
                              onCancel(bill)
                            }
                            className="btn btn-sm btn-ghost text-orange-500 hover:bg-orange-50"
                            title="Cancel Bill"
                          >
                            <FiX size={16} />
                          </button>
                        )}

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(bill)
                        }
                        className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                        title="Delete Bill"
                      >
                        <FiTrash2
                          size={16}
                        />
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

export default BillTable;