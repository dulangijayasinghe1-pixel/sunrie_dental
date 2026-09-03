import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import PatientForm from "../../components/patients/PatientForm";
import * as patientService from "../../services/patientService";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load patient
  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError("Patient ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await patientService.getPatientById(id);

        console.log(
          "Edit patient response:",
          response
        );

        // Service already returns response.data
        setPatient(response);
      } catch (err) {
        console.error(
          "Failed to load patient:",
          err
        );

        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load patient.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  // Update patient
  const handleSubmit = async (patientData) => {
    try {
      setSaving(true);
      setError("");

      console.log(
        "Updated patient data:",
        patientData
      );

      await patientService.updatePatient(
        id,
        patientData
      );

      toast.success(
        "Patient updated successfully."
      );

      navigate(`/patients/${id}`);
    } catch (err) {
      console.error(
        "Failed to update patient:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update patient.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Loading message="Loading patient..." />
    );
  }

  if (error && !patient) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} />

        <button
          type="button"
          onClick={() => navigate("/patients")}
          className="btn mt-4"
        >
          <FiArrowLeft size={18} />
          Back to Patients
        </button>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6">
        <p className="text-[#64756C]">
          Patient not found.
        </p>

        <button
          type="button"
          onClick={() => navigate("/patients")}
          className="btn mt-4"
        >
          <FiArrowLeft size={18} />
          Back
        </button>
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
              navigate(`/patients/${id}`)
            }
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#5F8D7A] hover:text-[#4F7968]"
          >
            <FiArrowLeft size={16} />
            Back to Patient
          </button>

          <h1 className="text-3xl font-bold text-[#26332D]">
            Edit Patient
          </h1>

          <p className="mt-1 text-[#64756C]">
            Update patient information
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Form */}
        <div className="rounded-2xl border border-[#A8C3B2] bg-white p-6 shadow-sm md:p-8">
          <PatientForm
            initialData={patient}
            onSubmit={handleSubmit}
            loading={saving}
            submitText="Update Patient"
          />
        </div>
      </div>
    </div>
  );
}

export default EditPatient;