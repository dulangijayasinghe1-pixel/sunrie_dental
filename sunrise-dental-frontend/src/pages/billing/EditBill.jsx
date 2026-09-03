import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

import * as billService from "../../services/billService";
import * as patientService from "../../services/patientService";
import * as treatmentService from "../../services/treatmentService";
import * as appointmentService from "../../services/appointmentService";

import BillForm from "../../components/billing/BillForm";
import Loading from "../../components/common/Loading";

function EditBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          billData,
          patientData,
          treatmentData,
          appointmentData,
        ] = await Promise.all([
          billService.getBillById(id),
          patientService.getAllPatients(),
          treatmentService.getAllTreatments(),
          appointmentService.getAllAppointments(),
        ]);

        setBill(billData);

        setPatients(Array.isArray(patientData) ? patientData : []);
        setTreatments(Array.isArray(treatmentData) ? treatmentData : []);
        setAppointments(
          Array.isArray(appointmentData) ? appointmentData : []
        );
      } catch (err) {
        console.error("Edit bill load error:", err);

        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load bill details.";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");

      await billService.updateBill(id, formData);

      toast.success("Bill updated successfully.");

      navigate(`/billing/${id}`);
    } catch (err) {
      console.error("Update bill error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update bill.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!bill) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Bill not found."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/billing")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5F8D7A] text-white hover:bg-[#4f7967] transition"
          >
            <FiArrowLeft />
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#26332D]">
            Edit Bill
          </h1>
          <p className="text-sm text-[#64756C] mt-1">
            Update bill #{bill.billId}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/billing/${id}`)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#A8C3B2] bg-white text-[#26332D] hover:bg-[#A8C3B2]/20 transition"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl border border-[#A8C3B2]/40 shadow-sm p-5 sm:p-6">
        <BillForm
          initialData={bill}
          patients={patients}
          treatments={treatments}
          appointments={appointments}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Update Bill"
          submitIcon={<FiSave />}
        />
      </div>
    </div>
  );
}

export default EditBill;