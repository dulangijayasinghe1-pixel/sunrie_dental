import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { toast } from "react-toastify";

import BillPrintButton from "../../components/billing/BillPrintButton";
import * as billService from "../../services/billService";

function BillDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadBill = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await billService.getBillById(id);

        if (!cancelled) {
          setBill(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);

          setError(
            err?.response?.data?.message ||
              "Failed to load bill."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBill();

    return () => {
      cancelled = true;
    };
  }, [id]);

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

  const formatDateTime = (value) => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-LK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handlePay = async () => {
    const confirmed = window.confirm(
      `Mark Bill #${bill.billId} as paid?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedBill =
        await billService.markBillAsPaid(
          bill.billId
        );

      setBill(updatedBill);

      toast.success(
        "Bill marked as paid."
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to mark bill as paid."
      );
    }
  };

  const handleCancel = async () => {
    const confirmed = window.confirm(
      `Cancel Bill #${bill.billId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedBill =
        await billService.cancelBill(
          bill.billId
        );

      setBill(updatedBill);

      toast.success(
        "Bill cancelled successfully."
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to cancel bill."
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete Bill #${bill.billId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await billService.deleteBill(
        bill.billId
      );

      toast.success(
        "Bill deleted successfully."
      );

      navigate("/billing");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to delete bill."
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-[#64756C]">
        Loading bill...
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          {error || "Bill not found."}
        </div>
      </div>
    );
  }

  const status =
    bill.paymentStatus?.toUpperCase();

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate("/billing")
            }
            className="rounded-lg p-2 hover:bg-[#A8C3B2]/20"
          >
            <FiArrowLeft
              size={22}
            />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#26332D]">
              Bill #{bill.billId}
            </h1>

            <p className="mt-1 text-[#64756C]">
              Bill details
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <BillPrintButton
            billId={bill.billId}
          />

          {status === "PENDING" && (
            <>
              <button
                type="button"
                onClick={handlePay}
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                <FiCheckCircle />
                Mark Paid
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="btn bg-orange-500 text-white hover:bg-orange-600"
              >
                <FiXCircle />
                Cancel
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            <FiTrash2 />
            Delete
          </button>

        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* DETAILS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* PATIENT */}
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
            Patient
          </h2>

          <div className="space-y-3">

            <div>
              <p className="text-sm text-[#64756C]">
                Name
              </p>

              <p className="font-medium text-[#26332D]">
                {bill.patientName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Email
              </p>

              <p className="text-[#26332D]">
                {bill.patientEmail || "-"}
              </p>
            </div>

          </div>
        </div>

        {/* TREATMENT */}
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
            Treatment
          </h2>

          <div className="space-y-3">

            <div>
              <p className="text-sm text-[#64756C]">
                Treatment
              </p>

              <p className="font-medium text-[#26332D]">
                {bill.treatmentName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Appointment
              </p>

              <p className="text-[#26332D]">
                {formatDateTime(
                  bill.appointmentDateTime
                )}
              </p>
            </div>

          </div>
        </div>

        {/* BILLING */}
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
            Billing Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <div>
              <p className="text-sm text-[#64756C]">
                Amount
              </p>

              <p className="text-lg font-semibold text-[#26332D]">
                {formatCurrency(
                  bill.amount
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Discount
              </p>

              <p className="text-lg font-semibold text-[#26332D]">
                {formatCurrency(
                  bill.discount
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Total Amount
              </p>

              <p className="text-xl font-bold text-[#5F8D7A]">
                {formatCurrency(
                  bill.totalAmount
                )}
              </p>
            </div>

          </div>

          {/* STATUS */}
          <div className="mt-6">

            <p className="text-sm text-[#64756C]">
              Payment Status
            </p>

            <span className="badge mt-1 border-none bg-[#A8C3B2] px-4 py-3 text-[#26332D]">
              {bill.paymentStatus || "-"}
            </span>

          </div>

          {/* DESCRIPTION */}
          {bill.description && (
            <div className="mt-6">

              <p className="text-sm text-[#64756C]">
                Description
              </p>

              <p className="mt-1 text-[#26332D]">
                {bill.description}
              </p>

            </div>
          )}

          {/* DATE */}
          <div className="mt-6 border-t pt-4">

            <p className="text-sm text-[#64756C]">
              Bill Date
            </p>

            <p className="text-[#26332D]">
              {formatDateTime(
                bill.billDate
              )}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default BillDetails;