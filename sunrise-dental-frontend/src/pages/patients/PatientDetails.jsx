import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "react-toastify";

import * as patientService from "../../services/patientService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          "Patient details response:",
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

  const handleDelete = async () => {
    if (!patient) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await patientService.deletePatient(id);

      toast.success(
        "Patient deleted successfully."
      );

      navigate("/patients");
    } catch (err) {
      console.error(
        "Failed to delete patient:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete patient.";

      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading patient..." />;
  }

  if (error) {
    return (
      <div className="min-h-full bg-[#F7F5EF] p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <ErrorMessage message={error} />

            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5F8D7A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4F7968]"
            >
              <FiArrowLeft size={18} />
              Back to Patients
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-full bg-[#F7F5EF] p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#A8C3B2]/60 bg-white p-8 text-center shadow-sm">
            <p className="text-[#64756C]">
              Patient not found.
            </p>

            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5F8D7A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4F7968]"
            >
              <FiArrowLeft size={18} />
              Back to Patients
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isMinor =
    patient.age !== null &&
    patient.age !== undefined &&
    patient.age < 13;

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          {/* Title */}
          <div>
            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="mb-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-[#5F8D7A] transition hover:text-[#4F7968]"
            >
              <FiArrowLeft size={17} />
              Back to Patients
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-[#26332D]">
              Patient Details
            </h1>

            <p className="mt-2 text-sm text-[#64756C]">
              View patient information and details
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">

            {/* Edit */}
            <button
              type="button"
              onClick={() =>
                navigate(`/patients/${id}/edit`)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#5F8D7A] bg-[#5F8D7A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4F7968] hover:shadow-md"
            >
              <FiEdit2 size={17} />
              Edit
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500 bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-600 hover:shadow-md"
            >
              <FiTrash2 size={17} />
              Delete
            </button>

          </div>
        </div>

        {/* Patient Information Card */}
        <div className="overflow-hidden rounded-2xl border border-[#A8C3B2]/60 bg-white shadow-sm">

          {/* Card Header */}
          <div className="border-b border-[#D9E4DE] px-6 py-5 md:px-8">
            <h2 className="text-xl font-bold text-[#26332D]">
              Patient Information
            </h2>

            <p className="mt-1 text-sm text-[#64756C]">
              Personal and contact information
            </p>
          </div>

          {/* Information */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">

              <InfoItem
                label="Patient Name"
                value={patient.name || "-"}
              />

              <InfoItem
                label="Age"
                value={
                  patient.age !== null &&
                  patient.age !== undefined
                    ? `${patient.age} years`
                    : "-"
                }
              />

              <InfoItem
                label="Date of Birth"
                value={patient.dob || "-"}
              />

              <InfoItem
                label="Gender"
                value={patient.gender || "-"}
              />

              <InfoItem
                label="Phone"
                value={patient.phone || "-"}
              />

              <InfoItem
                label="Email"
                value={patient.email || "-"}
              />

              <div className="md:col-span-2">
                <InfoItem
                  label="Address"
                  value={patient.address || "-"}
                />
              </div>

            </div>

            {/* Guardian */}
            {isMinor && (
              <div className="mt-8 rounded-2xl border border-[#A8C3B2]/60 bg-[#F7F5EF] p-6">

                <div className="mb-5">
                  <h2 className="text-xl font-bold text-[#26332D]">
                    Guardian Details
                  </h2>

                  <p className="mt-1 text-sm text-[#64756C]">
                    Guardian information for this minor patient
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">

                  <InfoItem
                    label="Guardian Name"
                    value={
                      patient.guardianName || "-"
                    }
                  />

                  <InfoItem
                    label="Guardian Contact"
                    value={
                      patient.guardianContact || "-"
                    }
                  />

                  <InfoItem
                    label="Guardian Email"
                    value={
                      patient.guardianEmail || "-"
                    }
                  />

                </div>
              </div>
            )}

          </div>

          {/* Bottom Accent */}
          <div className="h-1 bg-[#A8C3B2]" />

        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-[#D9E4DE] bg-[#FBFCFA] px-4 py-4 transition-colors hover:bg-[#F7F5EF]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#64756C]">
        {label}
      </p>

      <p className="break-words text-base font-semibold text-[#26332D]">
        {value}
      </p>
    </div>
  );
}

export default PatientDetails;