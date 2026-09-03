import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import useAuthStore from "../../store/authStore";

function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF]">

      {/* Fixed Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Area */}
      <div className="ml-64 min-h-screen">

        {/* Fixed Top Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="pt-20">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;