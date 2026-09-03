import { useState } from "react";

function PatientForm({
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Patient",
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    dob: initialData.dob || "",
    gender: initialData.gender || "",
    phone: initialData.phone || "",
    email: initialData.email || "",
    address: initialData.address || "",
    guardianName: initialData.guardianName || "",
    guardianContact: initialData.guardianContact || "",
    guardianEmail: initialData.guardianEmail || "",
  });

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();

    let calculatedAge =
      today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  // Age is calculated from DOB
  const age = calculateAge(formData.dob);

  // Guardian is required only below 13
  const isMinor = age !== null && age < 13;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation for patients below 13
    if (isMinor) {
      if (!formData.guardianName.trim()) {
        alert("Guardian name is required for patients below 13.");
        return;
      }

      if (!formData.guardianContact.trim()) {
        alert("Guardian contact is required for patients below 13.");
        return;
      }
    }

    // Send data according to PatientRequest
    const patientData = {
      name: formData.name,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      phone: formData.phone,
      email: formData.email || null,

      guardianName: isMinor
        ? formData.guardianName
        : null,

      guardianContact: isMinor
        ? formData.guardianContact
        : null,

      guardianEmail: isMinor
        ? formData.guardianEmail || null
        : null,
    };

    onSubmit(patientData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ================================
          PATIENT DETAILS
      ================================= */}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
          Patient Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Patient Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Patient Name *
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
              placeholder="Enter patient name"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Date of Birth *
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
              className="input input-bordered w-full"
            />

            {/* Display calculated age */}
            {age !== null && age >= 0 && (
              <p className="mt-1 text-sm text-[#64756C]">
                Age:{" "}
                <span className="font-semibold text-[#5F8D7A]">
                  {age}
                </span>
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Gender *
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={150}
              className="input input-bordered w-full"
              placeholder="patient@email.com"
            />

            <p className="mt-1 text-xs text-[#64756C]">
              Optional
            </p>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#26332D]">
              Address *
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={255}
              rows={3}
              className="textarea textarea-bordered w-full"
              placeholder="Enter patient address"
            />
          </div>
        </div>
      </div>

      {/* ================================
          GUARDIAN DETAILS
          ONLY FOR AGE BELOW 13
      ================================= */}

      {isMinor && (
        <div className="rounded-xl border border-[#A8C3B2] bg-[#F7F5EF] p-5">

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#26332D]">
              Guardian Details
            </h2>

            <p className="mt-1 text-sm text-[#64756C]">
              This patient is below 13 years old.
              Guardian name and contact are required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Guardian Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-[#26332D]">
                Guardian Name *
              </label>

              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                required={isMinor}
                className="input input-bordered w-full"
                placeholder="Enter guardian name"
              />
            </div>

            {/* Guardian Contact */}
            <div>
              <label className="mb-1 block text-sm font-medium text-[#26332D]">
                Guardian Contact *
              </label>

              <input
                type="tel"
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleChange}
                required={isMinor}
                pattern="^(?:\+94|0)7\d{8}$"
                className="input input-bordered w-full"
                placeholder="0712345678"
              />

              <p className="mt-1 text-xs text-[#64756C]">
                Example: 0712345678 or +94712345678
              </p>
            </div>

            {/* Guardian Email */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#26332D]">
                Guardian Email
              </label>

              <input
                type="email"
                name="guardianEmail"
                value={formData.guardianEmail}
                onChange={handleChange}
                maxLength={150}
                className="input input-bordered w-full"
                placeholder="guardian@email.com"
              />

              <p className="mt-1 text-xs text-[#64756C]">
                Optional
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================================
          SUBMIT BUTTON
      ================================= */}

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

export default PatientForm;