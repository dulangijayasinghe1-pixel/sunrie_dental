import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BillForm from "../../components/billing/BillForm";

import * as billService from "../../services/billService";
import * as patientService from "../../services/patientService";
import * as treatmentService from "../../services/treatmentService";
import * as appointmentService from "../../services/appointmentService";

function CreateBill() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loadingData, setLoadingData] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoadingData(true);
        setError("");

        const [
          patientData,
          treatmentData,
          appointmentData,
        ] = await Promise.all([
          patientService.getAllPatients(),
          treatmentService.getAllTreatments(),
          appointmentService.getAllAppointments(),
        ]);

        console.log(
          "Patients:",
          patientData
        );

        console.log(
          "Treatments:",
          treatmentData
        );

        console.log(
          "Appointments:",
          appointmentData
        );

        if (!cancelled) {
          setPatients(
            Array.isArray(patientData)
              ? patientData
              : []
          );

          setTreatments(
            Array.isArray(treatmentData)
              ? treatmentData
              : []
          );

          setAppointments(
            Array.isArray(appointmentData)
              ? appointmentData
              : []
          );
        }

      } catch (err) {
        if (!cancelled) {
          console.error(err);

          const message =
            err?.response?.data?.message ||
            "Failed to load required data.";

          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoadingData(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (billData) => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "Bill payload:",
        billData
      );

      const createdBill =
        await billService.createBill(
          billData
        );

      toast.success(
        "Bill created successfully."
      );

      const billId =
        createdBill?.billId ??
        createdBill?.id;

      if (billId) {
        navigate(
          `/billing/${billId}`
        );
      } else {
        navigate("/billing");
      }

    } catch (err) {
      console.error(
        "Create bill error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        "Failed to create bill.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-[#26332D]">
          Create Bill
        </h1>

        <p className="mt-1 text-[#64756C]">
          Create a new patient bill
        </p>

      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {loadingData ? (
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-8 text-center text-[#64756C]">
          Loading data...
        </div>
      ) : (
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-6 shadow-sm">

          <BillForm
            patients={patients}
            treatments={treatments}
            appointments={appointments}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Create Bill"
          />

        </div>
      )}

    </div>
  );
}

export default CreateBill;