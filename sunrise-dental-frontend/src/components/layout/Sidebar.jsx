import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiClock,
  FiFileText,
  FiCreditCard,
  FiBarChart2,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import toothImage from "../../assets/tooth.png";

function Sidebar({ onLogout }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: FiUsers,
    },
    {
      name: "Dentists",
      path: "/dentists",
      icon: FiUserCheck,
    },
    {
      name: "Schedules",
      path: "/schedules",
      icon: FiClock,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: FiCalendar,
    },
    {
      name: "Treatments",
      path: "/treatments",
      icon: FiFileText,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: FiCreditCard,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FiBarChart2,
    },
    {
      name: "My Profile",
      path: "/staff/profile",
      icon: FiUser,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[#A8C3B2]/40 bg-white">

      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-[#A8C3B2]/30 px-6">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F5EF]">
            <img
              src={toothImage}
              alt="Sunrise Dental"
              className="h-9 w-9 object-contain"
            />
          </div>

          <div>
            <h1 className="font-bold text-[#26332D]">
              Sunrise Dental
            </h1>

            <p className="text-xs text-[#64756C]">
              Staff Portal
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#64756C]">
          Main Menu
        </p>

        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                      isActive
                        ? "bg-[#5F8D7A] text-white shadow-sm"
                        : "text-[#26332D] hover:bg-[#A8C3B2]/20 hover:text-[#5F8D7A]"
                    }`
                  }
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-[#A8C3B2]/30 p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition hover:bg-red-50"
        >
          <FiLogOut size={19} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;