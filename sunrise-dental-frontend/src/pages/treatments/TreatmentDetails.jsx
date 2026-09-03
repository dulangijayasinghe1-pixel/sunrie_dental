import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

import * as treatmentService from "../../services/treatmentService";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function TreatmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadTreatment = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Treatment ID is missing.");
          return;
        }

        const response =
          await treatmentService.getTreatmentById(id);

        console.log("Treatment details response:", response);

        if (!cancelled) {
          // Service already returns response.data
          setTreatment(response);
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

    loadTreatment();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!treatment) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${treatment.treatmentName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const treatmentId =
        treatment.treatmentId || id;

      await treatmentService.deleteTreatment(
        treatmentId
      );

      toast.success(
        "Treatment deleted successfully."
      );

      navigate("/treatments");
    } catch (err) {
      console.error(
        "Failed to delete treatment:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete treatment.";

      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
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
      return value;
    }

    return date.toLocaleString("en-LK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
          onClick={() => navigate("/treatments")}
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

        <button
          type="button"
          onClick={() => navigate("/treatments")}
          className="btn mt-4"
        >
          <FiArrowLeft size={18} />
          Back to Treatments
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <button
              type="button"
              onClick={() =>
                navigate("/treatments")
              }
              className="mb-3 inline-flex items-center gap-2 text-sm text-[#5F8D7A] hover:text-[#4F7968]"
            >
              <FiArrowLeft size={16} />
              Back to Treatments
            </button>

            <h1 className="text-3xl font-bold text-[#26332D]">
              Treatment Details
            </h1>

            <p className="mt-1 text-[#64756C]">
              View treatment information
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/treatments/${treatment.treatmentId}/edit`
                )
              }
              className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
            >
              <FiEdit2 size={17} />
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="btn border-none bg-red-500 text-white hover:bg-red-600"
            >
              <FiTrash2 size={17} />
              Delete
            </button>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Treatment Information */}
        <div className="rounded-2xl border border-[#A8C3B2] bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 text-xl font-semibold text-[#26332D]">
            Treatment Information
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <InfoItem
              label="Treatment Name"
              value={
                treatment.treatmentName || "-"
              }
            />

            <InfoItem
              label="Patient"
              value={
                treatment.patientName || "-"
              }
            />

            <InfoItem
              label="Dentist"
              value={
                treatment.dentistName || "-"
              }
            />

            <InfoItem
              label="Appointment"
              value={formatDateTime(
                treatment.appointmentDateTime
              )}
            />

            <InfoItem
              label="Cost"
              value={formatCurrency(
                treatment.cost
              )}
            />

            <InfoItem
              label="Status"
              value={
                treatment.status || "-"
              }
            />

          </div>

          {/* Description */}
          {treatment.description && (
            <div className="mt-8 border-t border-[#A8C3B2]/40 pt-6">

              <p className="mb-2 text-sm font-medium text-[#64756C]">
                Description
              </p>

              <p className="text-[#26332D]">
                {treatment.description}
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-[#64756C]">
        {label}
      </p>

      <p className="text-base font-medium text-[#26332D]">
        {value}
      </p>
    </div>
  );
}

export default TreatmentDetails;