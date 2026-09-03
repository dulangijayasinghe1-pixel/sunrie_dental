import { useState } from "react";

function DentistForm({
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Dentist",
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    specialization: initialData.specialization || "",
    registrationNumber: initialData.registrationNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dentistData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialization: formData.specialization,
      registrationNumber: formData.registrationNumber,
    };

    onSubmit(dentistData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Dentist Details */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
          Dentist Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Dentist Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Dentist Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              className="input input-bordered w-full"
              placeholder="Enter dentist name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={150}
              className="input input-bordered w-full"
              placeholder="dentist@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^(?:\+94|0)7\d{8}$"
              className="input input-bordered w-full"
              placeholder="0712345678"
            />

            <p className="mt-1 text-xs text-[#64756C]">
              Example: 0712345678 or +94712345678
            </p>
          </div>

          {/* Specialization */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Specialization *
            </label>

            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              className="input input-bordered w-full"
              placeholder="e.g. Orthodontist"
            />
          </div>

          {/* Registration Number */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Registration Number *
            </label>

            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              className="input input-bordered w-full"
              placeholder="Enter registration number"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn border-none bg-[#5F8D7A] px-6 text-white hover:bg-[#4F7968]"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Saving...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>

    </form>
  );
}

export default DentistForm;