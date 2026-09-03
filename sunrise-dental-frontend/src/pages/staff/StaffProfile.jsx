import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiSave,
} from "react-icons/fi";

import * as staffService from "../../services/staffService";
import useAuthStore from "../../store/authStore";

function StaffProfile() {
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // GET MY PROFILE
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await staffService.getMyProfile();

        if (cancelled) return;

        setProfile(data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (error) {
        if (cancelled) return;

        console.error("Error loading staff profile:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load staff profile."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // EDIT PROFILE
  // ==========================================

  const handleEdit = () => {
    setEditing(true);
    setError("");
    setSuccess("");
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }

    setEditing(false);
    setError("");
    setSuccess("");
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    try {
      setSaving(true);

      const updatedProfile =
        await staffService.updateMyProfile({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        });

      setProfile(updatedProfile);

      setFormData({
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
      });

      // ==========================================
      // UPDATE AUTH STORE
      // ==========================================

      const currentUser = useAuthStore.getState().user;

      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name: updatedProfile.name,
          email: updatedProfile.email,
          role: updatedProfile.role,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        useAuthStore.setState({
          user: updatedUser,
        });
      }

      setEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating staff profile:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#5F8D7A]"></span>

          <p className="mt-3 text-sm text-[#64756C]">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE NOT FOUND
  // ==========================================

  if (!profile) {
    return (
      <div className="min-h-[70vh] bg-[#F7F5EF] p-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <FiXCircle
            size={40}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-xl font-semibold text-[#26332D]">
            Unable to Load Profile
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error || "Staff profile not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-6">
      <div className="mx-auto max-w-5xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A8C3B2] text-[#26332D]">
              <FiUser size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#26332D]">
                Staff Profile
              </h1>

              <p className="text-sm text-[#64756C]">
                View and manage your profile information.
              </p>
            </div>

          </div>

          {!editing && (
            <button
              type="button"
              onClick={handleEdit}
              className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
            >
              <FiEdit2 size={17} />
              Edit Profile
            </button>
          )}

        </div>

        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            SUCCESS MESSAGE
        ========================================== */}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <FiCheckCircle size={18} />
            {success}
          </div>
        )}

        {/* ==========================================
            PROFILE CARD
        ========================================== */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Profile Header */}

          <div className="bg-[#5F8D7A] px-6 py-8">

            <div className="flex flex-col items-center gap-4 md:flex-row">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#5F8D7A] shadow-sm">
                <FiUser size={42} />
              </div>

              <div className="text-center md:text-left">

                <h2 className="text-2xl font-bold text-white">
                  {profile.name}
                </h2>

                <p className="mt-1 text-sm text-white/80">
                  {profile.email}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">

                  {/* Role */}

                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                    {profile.role}
                  </span>

                  {/* Email Verification */}

                  {profile.emailVerified ? (
                    <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#5F8D7A]">
                      <FiCheckCircle size={13} />
                      Email Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                      <FiXCircle size={13} />
                      Email Not Verified
                    </span>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              PROFILE FORM
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
          >

            <div className="mb-6">

              <h3 className="text-lg font-semibold text-[#26332D]">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-[#64756C]">
                Update your staff account details.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* ==========================================
                  NAME
              ========================================== */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#26332D]">
                  Full Name
                </label>

                <div className="relative">

                  <FiUser
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64756C]"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing || saving}
                    className="input input-bordered w-full border-[#A8C3B2] bg-white pl-10 text-[#26332D] focus:border-[#5F8D7A] focus:outline-none disabled:bg-[#F7F5EF]"
                    placeholder="Enter your name"
                  />

                </div>

              </div>

              {/* ==========================================
                  EMAIL
              ========================================== */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#26332D]">
                  Email
                </label>

                <div className="relative">

                  <FiMail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64756C]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing || saving}
                    className="input input-bordered w-full border-[#A8C3B2] bg-white pl-10 text-[#26332D] focus:border-[#5F8D7A] focus:outline-none disabled:bg-[#F7F5EF]"
                    placeholder="Enter your email"
                  />

                </div>

              </div>

              {/* ==========================================
                  PHONE
              ========================================== */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#26332D]">
                  Phone Number
                </label>

                <div className="relative">

                  <FiPhone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64756C]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing || saving}
                    className="input input-bordered w-full border-[#A8C3B2] bg-white pl-10 text-[#26332D] focus:border-[#5F8D7A] focus:outline-none disabled:bg-[#F7F5EF]"
                    placeholder="07XXXXXXXX"
                  />

                </div>

                <p className="mt-1 text-xs text-[#64756C]">
                  Example: 0712345678
                </p>

              </div>

              {/* ==========================================
                  ROLE
              ========================================== */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#26332D]">
                  Role
                </label>

                <div className="relative">

                  <FiShield
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64756C]"
                  />

                  <input
                    type="text"
                    value={profile.role || "-"}
                    disabled
                    className="input input-bordered w-full border-[#A8C3B2] bg-[#F7F5EF] pl-10 text-[#26332D]"
                  />

                </div>

                <p className="mt-1 text-xs text-[#64756C]">
                  Role cannot be changed from this page.
                </p>

              </div>

            </div>

            {/* ==========================================
                ACCOUNT STATUS
            ========================================== */}

            <div className="mt-8 border-t border-[#E5E7E3] pt-6">

              <h3 className="mb-4 text-lg font-semibold text-[#26332D]">
                Account Status
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Email Verification */}

                <div className="flex items-center justify-between rounded-xl border border-[#A8C3B2] bg-[#F7F5EF] p-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-[#A8C3B2] p-2 text-[#26332D]">
                      <FiMail size={18} />
                    </div>

                    <div>

                      <p className="text-sm font-medium text-[#26332D]">
                        Email Verification
                      </p>

                      <p className="text-xs text-[#64756C]">
                        Email account verification status
                      </p>

                    </div>

                  </div>

                  {profile.emailVerified ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <FiCheckCircle size={17} />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                      <FiXCircle size={17} />
                      Not Verified
                    </span>
                  )}

                </div>

                {/* Active Status */}

                <div className="flex items-center justify-between rounded-xl border border-[#A8C3B2] bg-[#F7F5EF] p-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-[#A8C3B2] p-2 text-[#26332D]">
                      <FiShield size={18} />
                    </div>

                    <div>

                      <p className="text-sm font-medium text-[#26332D]">
                        Account Status
                      </p>

                      <p className="text-xs text-[#64756C]">
                        Current staff account status
                      </p>

                    </div>

                  </div>

                  {profile.active ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <FiCheckCircle size={17} />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                      <FiXCircle size={17} />
                      Inactive
                    </span>
                  )}

                </div>

              </div>

            </div>

            {/* ==========================================
                SAVE / CANCEL BUTTONS
            ========================================== */}

            {editing && (
              <div className="mt-8 flex justify-end gap-3 border-t border-[#E5E7E3] pt-6">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="btn btn-outline border-[#A8C3B2] text-[#26332D] hover:border-[#5F8D7A] hover:bg-[#F7F5EF]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
                >

                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={17} />
                      Save Changes
                    </>
                  )}

                </button>

              </div>
            )}

          </form>

        </div>

      </div>
    </div>
  );
}

export default StaffProfile;