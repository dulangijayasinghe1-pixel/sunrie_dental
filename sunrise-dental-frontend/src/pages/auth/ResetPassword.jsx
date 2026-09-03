import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiHeart,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as authService from "../../services/authService";

import resetPasswordImage from "../../assets/reset-password.png";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email] = useState(searchParams.get("email") || "");
  const [resetToken] = useState(
    searchParams.get("resetToken") || ""
  );

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!resetToken) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
        resetToken,
      });

      toast.success(
        "Password reset successfully. Please login."
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center px-4 sm:px-6 py-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl overflow-hidden">

        <div className="grid lg:grid-cols-2 min-h-[620px]">

          {/* LEFT - Image Section */}
          <div className="relative hidden lg:block overflow-hidden bg-[#A8C3B2]/20">

            <img
              src={resetPasswordImage}
              alt="Reset Password"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#26332D]/80 via-[#26332D]/20 to-transparent" />

            {/* Logo */}
            <div className="absolute top-8 left-8 flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white/95 flex items-center justify-center shadow-md">
                <FiHeart
                  size={22}
                  className="text-[#5F8D7A]"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  Sunrise Dental
                </h2>

                <p className="text-xs text-white/75">
                  Dental Care Clinic
                </p>
              </div>

            </div>

            {/* Image Text */}
            <div className="absolute bottom-8 left-8 right-8 text-white">

              <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs font-semibold mb-4">
                SUNRISE DENTAL CLINIC
              </span>

              <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
                Keep Your Account
                <span className="block text-[#A8C3B2]">
                  Safe & Secure
                </span>
              </h2>

              <p className="text-sm text-white/75 mt-4 max-w-md leading-6">
                Create a new secure password and continue
                accessing the Sunrise Dental staff portal.
              </p>

            </div>

          </div>

          {/* RIGHT - Reset Password Form */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="flex lg:hidden items-center justify-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-xl bg-[#5F8D7A] flex items-center justify-center">
                  <FiHeart
                    size={24}
                    className="text-white"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#26332D]">
                    Sunrise Dental
                  </h2>

                  <p className="text-xs text-[#64756C]">
                    Dental Care Clinic
                  </p>
                </div>

              </div>

              {/* Header */}
              <div className="mb-8">

                <span className="inline-block text-xs font-bold tracking-wider text-[#5F8D7A] mb-3">
                  ACCOUNT SECURITY
                </span>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#26332D]">
                  Reset Password
                </h1>

                <p className="mt-2 text-sm text-[#64756C] leading-6">
                  Create a new password for your account.
                </p>

              </div>

              {/* Reset Password Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* New Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26332D]">
                    New Password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={18}
                    />

                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        h-12
                        rounded-xl
                        border
                        border-[#D9E4DE]
                        bg-[#F7F5EF]/70
                        pl-11
                        pr-12
                        text-[#26332D]
                        placeholder:text-[#9AA69F]
                        outline-none
                        focus:border-[#5F8D7A]
                        focus:ring-2
                        focus:ring-[#5F8D7A]/15
                        transition
                      "
                      placeholder="Enter new password"
                    />

                    {/* Show / Hide */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          (prev) => !prev
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        p-2
                        text-[#64756C]
                        hover:text-[#5F8D7A]
                        transition
                      "
                      aria-label={
                        showNewPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showNewPassword ? (
                        <FiEyeOff size={19} />
                      ) : (
                        <FiEye size={19} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26332D]">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={18}
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        h-12
                        rounded-xl
                        border
                        border-[#D9E4DE]
                        bg-[#F7F5EF]/70
                        pl-11
                        pr-12
                        text-[#26332D]
                        placeholder:text-[#9AA69F]
                        outline-none
                        focus:border-[#5F8D7A]
                        focus:ring-2
                        focus:ring-[#5F8D7A]/15
                        transition
                      "
                      placeholder="Confirm new password"
                    />

                    {/* Show / Hide */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        p-2
                        text-[#64756C]
                        hover:text-[#5F8D7A]
                        transition
                      "
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={19} />
                      ) : (
                        <FiEye size={19} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Password Match Message */}
                {formData.confirmPassword && (
                  <p
                    className={`text-xs ${
                      formData.newPassword ===
                      formData.confirmPassword
                        ? "text-[#5F8D7A]"
                        : "text-red-500"
                    }`}
                  >
                    {formData.newPassword ===
                    formData.confirmPassword
                      ? "Passwords match."
                      : "Passwords do not match."}
                  </p>
                )}

                {/* Reset Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    bg-[#5F8D7A]
                    hover:bg-[#4F7968]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    text-white
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    shadow-sm
                    hover:shadow-md
                    transition
                    duration-300
                  "
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>

              </form>

              {/* Back to Login */}
              <p className="mt-7 text-center text-sm text-[#64756C]">

                Remember your password?{" "}

                <Link
                  to="/login"
                  className="
                    font-semibold
                    text-[#5F8D7A]
                    hover:text-[#4F7968]
                    hover:underline
                    transition
                  "
                >
                  Back to Login
                </Link>

              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;