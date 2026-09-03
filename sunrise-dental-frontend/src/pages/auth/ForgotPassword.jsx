import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FiMail,
  FiKey,
  FiArrowLeft,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as authService from "../../services/authService";

import forgotPasswordImage from "../../assets/forgot-password.png";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authService.forgotPassword({ email });

      toast.success(
        "Password reset OTP has been sent to your email."
      );

      navigate(
        `/verify-reset-otp?email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send reset OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-4 py-8 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-xl border border-[#D9E4DE]">
        <div className="grid min-h-[620px] lg:grid-cols-2">

          {/* LEFT - IMAGE */}
          <div className="relative hidden lg:block overflow-hidden">
            <img
              src={forgotPasswordImage}
              alt="Forgot Password"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#26332D]/90 via-[#26332D]/30 to-transparent" />

            {/* Logo */}
            <div className="absolute left-8 top-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-md">
                <img
                  src="/logo.png"
                  alt="Sunrise Dental Clinic"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div>
                <p className="text-lg font-bold text-white">
                  Sunrise Dental
                </p>

                <p className="text-xs text-white/80">
                  Dental Care Clinic
                </p>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-10 left-8 right-8 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <FiKey size={24} />
              </div>

              <h2 className="text-3xl font-bold leading-tight">
                Reset Your Password
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                Don't worry. We'll help you securely recover
                access to your Sunrise Dental account.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/90">
                <FiCheckCircle size={18} />
                <span>Simple & secure password recovery</span>
              </div>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F5EF]">
                  <img
                    src="/logo.png"
                    alt="Sunrise Dental Clinic"
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-[#26332D]">
                    Sunrise Dental
                  </h2>

                  <p className="text-xs text-[#64756C]">
                    Dental Care Clinic
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A8C3B2]/40">
                <FiKey
                  size={28}
                  className="text-[#5F8D7A]"
                />
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#5F8D7A]">
                  Account Recovery
                </p>

                <h1 className="text-3xl font-bold text-[#26332D] sm:text-4xl">
                  Forgot Password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#64756C]">
                  Enter your registered email address and we'll
                  send you a password reset OTP.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#26332D]">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={19}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      placeholder="Enter your email"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#D9E4DE]
                        bg-[#F9FAF8]
                        py-3.5
                        pl-11
                        pr-4
                        text-[#26332D]
                        outline-none
                        transition
                        focus:border-[#5F8D7A]
                        focus:ring-2
                        focus:ring-[#5F8D7A]/20
                      "
                    />
                  </div>

                  <p className="mt-2 text-xs text-[#64756C]">
                    Make sure you enter the email associated
                    with your account.
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#5F8D7A]
                    px-5
                    py-3.5
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#4F7968]
                    hover:shadow-md
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Reset OTP
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-8 border-t border-[#E5ECE8] pt-6">
                <Link
                  to="/login"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-semibold
                    text-[#5F8D7A]
                    transition
                    hover:text-[#4F7968]
                  "
                >
                  <FiArrowLeft size={17} />
                  Back to Login
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;