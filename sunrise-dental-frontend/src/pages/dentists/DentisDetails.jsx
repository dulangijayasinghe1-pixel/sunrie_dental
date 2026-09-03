import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

import * as dentistService from "../../services/dentistService";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function DentistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dentist, setDentist] = useState(null);
  const [loading, setLoading] = useState(true);
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
          "Dentist details response:",
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

  // Delete
  const handleDelete = async () => {
    if (!dentist) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${dentist.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await dentistService.deleteDentist(id);

      toast.success(
        "Dentist deleted successfully."
      );

      navigate("/dentists");
    } catch (err) {
      console.error(
        "Failed to delete dentist:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete dentist.";

      setError(message);
      toast.error(message);

      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return <Loading message="Loading dentist..." />;
  }

  // Error
  if (error) {
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
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <button
              type="button"
              onClick={() =>
                navigate("/dentists")
              }
              className="mb-3 inline-flex items-center gap-2 text-sm text-[#5F8D7A] hover:text-[#4F7968]"
            >
              <FiArrowLeft size={16} />
              Back to Dentists
            </button>

            <h1 className="text-3xl font-bold text-[#26332D]">
              Dentist Details
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">

            {/* Edit */}
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/dentists/${id}/edit`
                )
              }
              className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
            >
              <FiEdit2 size={17} />
              Edit
            </button>

            {/* Delete */}
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

        {/* Dentist Information */}
        <div className="rounded-2xl border border-[#A8C3B2] bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 text-xl font-semibold text-[#26332D]">
            Dentist Information
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <InfoItem
              label="Dentist Name"
              value={dentist.name || "-"}
            />

            <InfoItem
              label="Email"
              value={dentist.email || "-"}
            />

            <InfoItem
              label="Phone"
              value={dentist.phone || "-"}
            />

            <InfoItem
              label="Specialization"
              value={
                dentist.specialization || "-"
              }
            />

            <InfoItem
              label="Registration Number"
              value={
                dentist.registrationNumber || "-"
              }
            />

            <InfoItem
              label="Availability"
              value={
                dentist.available === true
                  ? "Available"
                  : dentist.available === false
                  ? "Unavailable"
                  : "-"
              }
            />
          </div>
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

export default DentistDetails;