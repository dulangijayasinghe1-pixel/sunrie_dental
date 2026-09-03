import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import DentistForm from "../../components/dentists/DentistForm";
import * as dentistService from "../../services/dentistService";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function EditDentist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dentist, setDentist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load dentist
  useEffect(() => {
    const fetchDentist = async () => {
      if (!id) {
        setError("Dentist ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await dentistService.getDentistById(id);

        console.log(
          "Edit dentist response:",
          response
        );

        // Service already returns response.data
        setDentist(response);
      } catch (err) {
        console.error(
          "Failed to load dentist:",
          err
        );

        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load dentist.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDentist();
  }, [id]);

  // Update dentist
  const handleSubmit = async (dentistData) => {
    try {
      setSaving(true);
      setError("");

      console.log(
        "Updated dentist data:",
        dentistData
      );

      await dentistService.updateDentist(
        id,
        dentistData
      );

      toast.success(
        "Dentist updated successfully."
      );

      navigate(`/dentists/${id}`);
    } catch (err) {
      console.error(
        "Failed to update dentist:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update dentist.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <Loading message="Loading dentist..." />
    );
  }

  // Error
  if (error && !dentist) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} />

        <button
          type="button"
          onClick={() => navigate("/dentists")}
          className="btn mt-4"
        >
          <FiArrowLeft size={18} />
          Back to Dentists
        </button>
      </div>
    );
  }

  // Not found
  if (!dentist) {
    return (
      <div className="p-6">
        <p className="text-[#64756C]">
          Dentist not found.
        </p>

        <button
          type="button"
          onClick={() => navigate("/dentists")}
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
              navigate(`/dentists/${id}`)
            }
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#5F8D7A] hover:text-[#4F7968]"
          >
            <FiArrowLeft size={16} />
            Back to Dentist
          </button>

          <h1 className="text-3xl font-bold text-[#26332D]">
            Edit Dentist
          </h1>

          <p className="mt-1 text-[#64756C]">
            Update dentist information
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
          <DentistForm
            initialData={dentist}
            onSubmit={handleSubmit}
            loading={saving}
            submitText="Update Dentist"
          />
        </div>
      </div>
    </div>
  );
}

export default EditDentist;