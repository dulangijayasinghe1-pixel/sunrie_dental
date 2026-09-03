import { Link, NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import toothImage from "../../assets/tooth.png";

function PublicNavbar() {
  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-[#5F8D7A]"
        : "text-[#26332D] hover:text-[#5F8D7A]"
    }`;

  return (
    <div className="navbar bg-white shadow-sm px-6 lg:px-16 sticky top-0 z-50">

      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-3">

          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={toothImage}
              alt="Sunrise Dental Clinic Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Clinic Name */}
          <div>
            <h1 className="text-xl font-bold text-[#26332D]">
              Sunrise Dental
            </h1>

            <p className="text-xs text-[#64756C]">
              Dental Care Clinic
            </p>
          </div>

        </Link>
      </div>

      {/* Navigation */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-6">

          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Staff Login */}
      <div className="navbar-end">
        <Link
          to="/login"
          className="
            bg-[#5F8D7A]
            hover:bg-[#4F7968]
            text-white
            px-5
            py-2.5
            rounded-xl
            font-medium
            flex
            items-center
            gap-2
            transition
            shadow-sm
            hover:shadow-md
          "
        >
          <FiLogIn size={18} />
          Staff Login
        </Link>
      </div>

    </div>
  );
}

export default PublicNavbar;