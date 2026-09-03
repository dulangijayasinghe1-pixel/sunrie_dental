import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import PatientForm from "../../components/patients/PatientForm";

import * as patientService from "../../services/patientService";

function AddPatient() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (patientData) => {
    try {
      setLoading(true);

      await patientService.createPatient(patientData);

      alert("Patient added successfully.");

      navigate("/patients");
    } catch (error) {
      console.error("Failed to add patient:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add patient."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/patients")}
          className="mb-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#5F8D7A] transition-all duration-200 hover:bg-[#A8C3B2]/20 hover:text-[#4F7968]"
        >
          <FiArrowLeft size={18} />
          Back to Patients
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#26332D]">
            Add Patient
          </h1>

          <p className="mt-2 text-sm text-[#64756C]">
            Create a new patient record
          </p>
        </div>

        {/* Form */}
        <div className="overflow-hidden rounded-2xl border border-[#A8C3B2]/60 bg-white shadow-sm">

          {/* Form Header */}
          <div className="border-b border-[#D9E4DE] bg-[#FBFCFA] px-6 py-5 md:px-8">
            <h2 className="text-lg font-bold text-[#26332D]">
              Patient Information
            </h2>

            <p className="mt-1 text-sm text-[#64756C]">
              Enter the patient's personal and contact details
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <PatientForm
              onSubmit={handleSubmit}
              loading={loading}
              submitText="Add Patient"
            />
          </div>

          {/* Bottom Accent */}
          <div className="h-1 bg-[#A8C3B2]" />

        </div>

      </div>
    </div>
  );
}

export default AddPatient;