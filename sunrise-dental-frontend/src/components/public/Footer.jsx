import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowUp,
} from "react-icons/fi";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#26332D] text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link to="/" className="inline-flex items-center gap-3">

              {/* Logo */}
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Sunrise Dental Clinic Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Brand Name */}
              <div>
                <h2 className="text-xl font-bold">
                  Sunrise Dental
                </h2>

                <p className="text-xs text-white/60">
                  Dental Care Clinic
                </p>
              </div>

            </Link>

            <p className="text-sm text-white/65 leading-6 mt-5 max-w-xs">
              Providing trusted, comfortable, and personalized
              dental care for you and your family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/65 hover:text-[#A8C3B2] transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/65 hover:text-[#A8C3B2] transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/65 hover:text-[#A8C3B2] transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-white/65 hover:text-[#A8C3B2] transition"
                >
                  Staff Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact
            </h3>

            <ul className="space-y-4">

              <li className="flex items-start gap-3">
                <FiMapPin
                  className="text-[#A8C3B2] mt-1 shrink-0"
                  size={18}
                />

                <span className="text-sm text-white/65 leading-5">
                  Sunrise Dental Clinic,
                  <br />
                  Colombo, Sri Lanka
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FiPhone
                  className="text-[#A8C3B2] shrink-0"
                  size={18}
                />

                <span className="text-sm text-white/65">
                  +94 11 234 5678
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FiMail
                  className="text-[#A8C3B2] shrink-0"
                  size={18}
                />

                <span className="text-sm text-white/65">
                  info@sunrisedental.lk
                </span>
              </li>

            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Opening Hours
            </h3>

            <div className="flex items-start gap-3">

              <FiClock
                className="text-[#A8C3B2] mt-1 shrink-0"
                size={18}
              />

              <div className="text-sm text-white/65 leading-6">
                <p>
                  Monday - Saturday
                </p>

                <p>
                  8:00 AM - 6:00 PM
                </p>

                <p className="mt-2">
                  Sunday: Closed
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-xs sm:text-sm text-white/50 text-center sm:text-left">
              © {new Date().getFullYear()} Sunrise Dental Clinic.
              All rights reserved.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-white/60
                hover:text-[#A8C3B2]
                transition
              "
            >
              Back to Top
              <FiArrowUp size={16} />
            </button>

          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;