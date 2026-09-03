import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import TreatmentTable from "../../components/treatments/TreatmentTable";
import * as treatmentService from "../../services/treatmentService";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function TreatmentList() {
  const navigate = useNavigate();

  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadTreatments = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await treatmentService.getAllTreatments();

        console.log(
          "Treatments response:",
          response
        );

        if (!cancelled) {
          setTreatments(
            Array.isArray(response)
              ? response
              : []
          );
        }
      } catch (err) {
        console.error(
          "Failed to load treatments:",
          err
        );

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Failed to load treatments."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTreatments();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (treatment) => {
    const treatmentId =
      treatment?.treatmentId;

    if (!treatmentId) {
      setError("Treatment ID is missing.");
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

      await treatmentService.deleteTreatment(
        treatmentId
      );

      setTreatments((prev) =>
        prev.filter(
          (item) =>
            item.treatmentId !== treatmentId
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete treatment:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to delete treatment."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleView = (treatment) => {
    const treatmentId =
      treatment?.treatmentId;

    if (!treatmentId) {
      setError("Treatment ID is missing.");
      return;
    }

    navigate(
      `/treatments/${treatmentId}`
    );
  };

  const handleEdit = (treatment) => {
    const treatmentId =
      treatment?.treatmentId;

    if (!treatmentId) {
      setError("Treatment ID is missing.");
      return;
    }

    navigate(
      `/treatments/${treatmentId}/edit`
    );
  };

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-2xl font-bold text-[#26332D]">
            Treatments
          </h1>

          <p className="mt-1 text-[#64756C]">
            Manage patient treatments
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/treatments/add")
          }
          className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
        >
          <FiPlus size={18} />
          Add Treatment
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Table */}
      {loading ? (
        <Loading message="Loading treatments..." />
      ) : (
        <TreatmentTable
          treatments={treatments}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}

export default TreatmentList;