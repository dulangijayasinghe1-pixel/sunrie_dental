import { useEffect, useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";

import * as dashboardService from "../../services/dashboardService";

import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await dashboardService.getDashboardSummary();

        if (!cancelled) {
          setDashboard(response);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "Failed to load dashboard data."
          );

          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatCurrency = (value) => {
    if (value === null || value === undefined) {
      return "Rs. 0.00";
    }

    return `Rs. ${Number(value).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#26332D]">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#64756C]">
          Overview of Sunrise Dental Clinic
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Patients */}
        <div className="group rounded-2xl border border-[#A8C3B2]/60 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-[#64756C]">
                Total Patients
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#26332D]">
                {dashboard?.totalPatients ?? 0}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A8C3B2]/40 transition group-hover:bg-[#A8C3B2]/60">
              <FiUsers
                size={24}
                className="text-[#26332D]"
              />
            </div>

          </div>
        </div>

        {/* Total Dentists */}
        <div className="group rounded-2xl border border-[#A8C3B2]/60 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-[#64756C]">
                Total Dentists
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#26332D]">
                {dashboard?.totalDentists ?? 0}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A8C3B2]/40 transition group-hover:bg-[#A8C3B2]/60">
              <FiUserCheck
                size={24}
                className="text-[#26332D]"
              />
            </div>

          </div>
        </div>

        {/* Available Dentists */}
        <div className="group rounded-2xl border border-[#A8C3B2]/60 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-[#64756C]">
                Available Dentists
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#26332D]">
                {dashboard?.availableDentists ?? 0}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A8C3B2]/40 transition group-hover:bg-[#A8C3B2]/60">
              <FiActivity
                size={24}
                className="text-[#26332D]"
              />
            </div>

          </div>
        </div>

        {/* Monthly Total */}
        <div className="group rounded-2xl border border-[#A8C3B2]/60 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div className="min-w-0">
              <p className="text-sm font-medium text-[#64756C]">
                Monthly Total
              </p>

              <h2 className="mt-3 truncate text-2xl font-bold text-[#26332D]">
                {formatCurrency(
                  dashboard?.monthlyTotalAmount
                )}
              </h2>
            </div>

            <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A8C3B2]/40 transition group-hover:bg-[#A8C3B2]/60">
              <FiDollarSign
                size={24}
                className="text-[#26332D]"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Welcome Section */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#A8C3B2]/60 bg-white shadow-sm">

        <div className="p-8">
          <div className="max-w-3xl">

            <h2 className="text-2xl font-bold text-[#26332D]">
              Welcome to Sunrise Dental Clinic
            </h2>

            <p className="mt-3 leading-7 text-[#64756C]">
              Manage patients, dentists, appointments,
              treatments, schedules, billing and reports
              from your dashboard.
            </p>

          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-[#A8C3B2]" />

      </div>

    </div>
  );
}

export default Dashboard;