import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import TreatmentForm from "../../components/treatments/TreatmentForm";

import * as treatmentService from "../../services/treatmentService";
import * as patientService from "../../services/patientService";
import * as dentistService from "../../services/dentistService";
import * as appointmentService from "../../services/appointmentService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function EditTreatment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [treatment, setTreatment] =
    useState(null);

  const [patients, setPatients] =
    useState([]);

  const [dentists, setDentists] =
    useState([]);

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Treatment ID is missing.");
          return;
        }

        const [
          treatmentData,
          patientData,
          dentistData,
          appointmentData,
        ] = await Promise.all([
          treatmentService.getTreatmentById(id),
          patientService.getAllPatients(),
          dentistService.getAllDentists(),
          appointmentService.getAllAppointments(),
        ]);

        console.log(
          "Treatment:",
          treatmentData
        );

        console.log(
          "Patients:",
          patientData
        );

        console.log(
          "Dentists:",
          dentistData
        );

        console.log(
          "Appointments:",
          appointmentData
        );

        if (!cancelled) {
          setTreatment(treatmentData);

          setPatients(
            Array.isArray(patientData)
              ? patientData
              : []
          );

          setDentists(
            Array.isArray(dentistData)
              ? dentistData
              : []
          );

          setAppointments(
            Array.isArray(appointmentData)
              ? appointmentData
              : []
          );
        }
      } catch (err) {
        console.error(
          "Failed to load treatment:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Failed to load treatment."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (
    treatmentData
  ) => {
    try {
      setSaving(true);
      setError("");

      await treatmentService.updateTreatment(
        id,
        treatmentData
      );

      toast.success(
        "Treatment updated successfully."
      );

      navigate(
        `/treatments/${id}`
      );
    } catch (err) {
      console.error(
        "Failed to update treatment:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update treatment.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Loading message="Loading treatment..." />
    );
  }

  if (error && !treatment) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} />

        <button
          type="button"
          onClick={() =>
            navigate("/treatments")
          }
          className="btn mt-4"
        >
          <FiArrowLeft size={18} />
          Back to Treatments
        </button>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          Treatment not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <button
            type="button"
            onClick={() =>
              navigate(
                `/treatments/${id}`
              )
            }
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#5F8D7A] hover:text-[#4F7968]"
          >
            <FiArrowLeft size={16} />
            Back to Treatment
          </button>

          <h1 className="text-3xl font-bold text-[#26332D]">
            Edit Treatment
          </h1>

          <p className="mt-1 text-[#64756C]">
            Update treatment details
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4">
            <ErrorMessage
              message={error}
            />
          </div>
        )}

        {/* Form */}
        <div className="rounded-2xl border border-[#A8C3B2] bg-white p-6 shadow-sm md:p-8">

          <TreatmentForm
            patients={patients}
            dentists={dentists}
            appointments={appointments}
            initialData={treatment}
            onSubmit={handleSubmit}
            loading={saving}
            submitText="Update Treatment"
          />

        </div>
      </div>
    </div>
  );
}

export default EditTreatment;