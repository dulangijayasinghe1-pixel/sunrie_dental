import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DentistForm from "../../components/dentists/DentistForm";
import * as dentistService from "../../services/dentistService";

function AddDentist() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (dentistData) => {
    try {
      setLoading(true);

      await dentistService.createDentist(
        dentistData
      );

      alert("Dentist added successfully.");

      navigate("/dentists");
    } catch (err) {
      console.error(
        "Failed to add dentist:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to add dentist."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#26332D]">
            Add Dentist
          </h1>

          <p className="mt-1 text-[#64756C]">
            Create a new dentist record
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-[#A8C3B2] bg-white p-6 shadow-sm md:p-8">
          <DentistForm
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Add Dentist"
          />
        </div>
      </div>
    </div>
  );
}

export default AddDentist;