import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";

import BillTable from "../../components/billing/BillTable";
import * as billService from "../../services/billService";

function BillList() {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBillId = (bill) => {
    return bill?.billId ?? bill?.id;
  };

  const loadBills = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await billService.getAllBills();

      console.log("Bills response:", data);

      setBills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load bills:", err);

      const message =
        err?.response?.data?.message ||
        "Failed to load bills.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await billService.getAllBills();

        if (!cancelled) {
          setBills(
            Array.isArray(data) ? data : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);

          setError(
            err?.response?.data?.message ||
              "Failed to load bills."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // VIEW
  const handleView = (bill) => {
    const billId = getBillId(bill);

    if (!billId) {
      toast.error("Bill ID not found.");
      return;
    }

    navigate(`/billing/${billId}`);
  };

  // PRINT
  const handlePrint = (bill) => {
    const billId = getBillId(bill);

    if (!billId) {
      toast.error("Bill ID not found.");
      return;
    }

    navigate(`/billing/${billId}/print`);
  };

  // EDIT
  const handleEdit = (bill) => {
    const billId = getBillId(bill);

    if (!billId) {
      toast.error("Bill ID not found.");
      return;
    }

    navigate(`/billing/${billId}/edit`);
  };

  // PAY
  const handlePay = async (bill) => {
    const billId = getBillId(bill);

    if (!billId) {
      toast.error("Bill ID not found.");
      return;
    }

    const confirmed = window.confirm(
      `Mark Bill #${billId} as paid?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedBill =
        await billService.markBillAsPaid(
          billId
        );

      setBills((prev) =>
        prev.map((item) =>
          getBillId(item) === billId
            ? updatedBill
            : item
        )
      );

      toast.success(
        `Bill #${billId} marked as paid.`
      );
    } catch (err) {
      console.error("Pay bill error:", err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to mark bill as paid."
      );
    }
  };

  // CANCEL
  const handleCancel = async (bill) => {
    const billId = getBillId(bill);

    if (!billId) {
      toast.error("Bill ID not found.");
      return;
    }

    const confirmed = window.confirm(
      `Cancel Bill #${billId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedBill =
        await billService.cancelBill(
          billId
        );

      setBills((prev) =>
        prev.map((item) =>
          getBillId(item) === billId
            ? updatedBill
            : item
        )
      );

      toast.success(
        `Bill #${billId} cancelled.`
      );
    } catch (err) {
      console.error("Cancel bill error:", err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to cancel bill."
      );
    }
  };

  // DELETE
  const handleDelete = async (bill) => {
    const billId = getBillId(bill);

    if (!billId) {
      toast.error("Bill ID not found.");
      return;
    }

    const confirmed = window.confirm(
      `Delete Bill #${billId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await billService.deleteBill(billId);

      setBills((prev) =>
        prev.filter(
          (item) =>
            getBillId(item) !== billId
        )
      );

      toast.success(
        `Bill #${billId} deleted successfully.`
      );
    } catch (err) {
      console.error("Delete bill error:", err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to delete bill."
      );
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-[#26332D]">
            Billing
          </h1>

          <p className="mt-1 text-[#64756C]">
            Manage patient bills and payments
          </p>
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={loadBills}
            className="btn btn-outline border-[#A8C3B2] text-[#26332D]"
          >
            <FiRefreshCw size={17} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/billing/create")
            }
            className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
          >
            <FiPlus size={17} />
            Create Bill
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
      {loading ? (
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-10 text-center text-[#64756C]">
          Loading bills...
        </div>
      ) : (
        <BillTable
          bills={bills}
          onView={handleView}
          onEdit={handleEdit}
          onPay={handlePay}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onPrint={handlePrint}
        />
      )}

    </div>
  );
}

export default BillList;