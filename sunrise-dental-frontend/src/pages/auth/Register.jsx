import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiHeart,
} from "react-icons/fi";

import { toast } from "react-toastify";

import * as authService from "../../services/authService";

import registerImage from "../../assets/register.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authService.registerStaff(formData);

      toast.success(
        "Registration successful. Check your email for the verification OTP."
      );

      navigate(
        `/verify-email?email=${encodeURIComponent(formData.email)}`
      );
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center px-4 sm:px-6 py-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl overflow-hidden">

        <div className="grid lg:grid-cols-2 min-h-[650px]">

          {/* LEFT - Image Section */}
          <div className="relative hidden lg:block overflow-hidden bg-[#A8C3B2]/20">

            <img
              src={registerImage}
              alt="Sunrise Dental Clinic"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#26332D]/80 via-[#26332D]/20 to-transparent" />

            {/* Logo / Brand */}
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
                Caring for Your
                <span className="block text-[#A8C3B2]">
                  Smile Every Day
                </span>
              </h2>

              <p className="text-sm text-white/75 mt-4 max-w-md leading-6">
                Join our team and help us provide trusted,
                comfortable, and professional dental care.
              </p>

            </div>

          </div>

          {/* RIGHT - Register Form */}
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
                  STAFF REGISTRATION
                </span>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#26332D]">
                  Create Account
                </h1>

                <p className="mt-2 text-sm text-[#64756C]">
                  Register as a Sunrise Dental staff member
                </p>

              </div>

              {/* Register Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26332D]">
                    Name
                  </label>

                  <div className="relative">

                    <FiUser
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={18}
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={100}
                      className="
                        w-full
                        h-12
                        rounded-xl
                        border
                        border-[#D9E4DE]
                        bg-[#F7F5EF]/70
                        pl-11
                        pr-4
                        text-[#26332D]
                        placeholder:text-[#9AA69F]
                        outline-none
                        focus:border-[#5F8D7A]
                        focus:ring-2
                        focus:ring-[#5F8D7A]/15
                        transition
                      "
                      placeholder="Enter your name"
                    />

                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26332D]">
                    Email
                  </label>

                  <div className="relative">

                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={18}
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={150}
                      className="
                        w-full
                        h-12
                        rounded-xl
                        border
                        border-[#D9E4DE]
                        bg-[#F7F5EF]/70
                        pl-11
                        pr-4
                        text-[#26332D]
                        placeholder:text-[#9AA69F]
                        outline-none
                        focus:border-[#5F8D7A]
                        focus:ring-2
                        focus:ring-[#5F8D7A]/15
                        transition
                      "
                      placeholder="Enter your email"
                    />

                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26332D]">
                    Phone Number
                  </label>

                  <div className="relative">

                    <FiPhone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={18}
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="^(?:\+94|0)7\d{8}$"
                      className="
                        w-full
                        h-12
                        rounded-xl
                        border
                        border-[#D9E4DE]
                        bg-[#F7F5EF]/70
                        pl-11
                        pr-4
                        text-[#26332D]
                        placeholder:text-[#9AA69F]
                        outline-none
                        focus:border-[#5F8D7A]
                        focus:ring-2
                        focus:ring-[#5F8D7A]/15
                        transition
                      "
                      placeholder="0712345678"
                    />

                  </div>

                  <p className="mt-1.5 text-xs text-[#64756C]">
                    Example: 0712345678 or +94712345678
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#26332D]">
                    Password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
                      size={18}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
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
                      placeholder="Enter your password"
                    />

                    {/* Show / Hide Password */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
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
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff size={19} />
                      ) : (
                        <FiEye size={19} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    mt-2
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
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

              </form>

              {/* Login Link */}
              <p className="mt-7 text-center text-sm text-[#64756C]">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-[#5F8D7A] hover:text-[#4F7968] hover:underline transition"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;