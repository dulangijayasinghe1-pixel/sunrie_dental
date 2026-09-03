import { FiMenu, FiUser } from "react-icons/fi";
import useAuthStore from "../../store/authStore";

function TopNavbar({ onMenuClick }) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-20 bg-white border-b border-[#A8C3B2]/30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-[#26332D] hover:bg-[#A8C3B2]/20 transition"
        >
          <FiMenu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-[#26332D]">
            Sunrise Dental Clinic
          </h2>

          <p className="text-sm text-[#64756C]">
            Staff Management Portal
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-[#26332D]">
            {user?.name || "Staff"}
          </p>

          <p className="text-xs text-[#64756C]">
            {user?.role || "Staff Member"}
          </p>
        </div>

        <div className="h-10 w-10 rounded-full bg-[#A8C3B2] flex items-center justify-center">
          <FiUser
            size={20}
            className="text-[#26332D]"
          />
        </div>

      </div>

    </header>
  );
}

export default TopNavbar;