import { useState } from "react";
import {
  FiBarChart2,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiFileText,
  FiDollarSign,
  FiRefreshCw,
} from "react-icons/fi";

import api from "../../services/api";

function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateReport = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start date and end date.");
      return;
    }

    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/reports", {
        params: {
          startDate,
          endDate,
        },
      });

      setReport(response.data);
    } catch (error) {
      console.error("Error generating report:", error);

      setError(
        error.response?.data?.message ||
          "Failed to generate report."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearReport = () => {
    setStartDate("");
    setEndDate("");
    setReport(null);
    setError("");
  };

  const formatCurrency = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString(
      "en-LK",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#A8C3B2] p-3 text-[#26332D]">
            <FiBarChart2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#26332D]">
              Reports
            </h1>

            <p className="text-sm text-[#64756C]">
              Generate clinic reports for a selected date range.
            </p>
          </div>
        </div>
      </div>

      {/* Date Filter */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-[#26332D]">
          Report Period
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Start Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#26332D]">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full border-[#A8C3B2] bg-white text-[#26332D] focus:border-[#5F8D7A] focus:outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#26332D]">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-full border-[#A8C3B2] bg-white text-[#26332D] focus:border-[#5F8D7A] focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-3">
            <button
              type="button"
              onClick={generateReport}
              disabled={loading}
              className="btn flex-1 border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Generating...
                </>
              ) : (
                <>
                  <FiBarChart2 size={17} />
                  Generate Report
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clearReport}
              className="btn btn-outline border-[#A8C3B2] text-[#26332D] hover:border-[#5F8D7A] hover:bg-[#F7F5EF]"
            >
              <FiRefreshCw size={17} />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Report */}
      {report && (
        <div>
          {/* Report Period */}
          <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-[#26332D]">
                  Clinic Report
                </h2>

                <p className="mt-1 text-sm text-[#64756C]">
                  {report.startDate} to {report.endDate}
                </p>
              </div>

              <div className="rounded-lg bg-[#F7F5EF] px-4 py-2 text-sm font-medium text-[#5F8D7A]">
                Report Generated
              </div>
            </div>
          </div>

          {/* Patient Summary */}
          <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
              Patient Summary
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ReportCard
                title="Total Patients"
                value={report.totalPatients}
                icon={<FiUsers size={22} />}
              />

              <ReportCard
                title="New Patients"
                value={report.newPatients}
                icon={<FiUsers size={22} />}
              />
            </div>
          </section>

          {/* Appointment Summary */}
          <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
              Appointment Summary
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ReportCard
                title="Total Appointments"
                value={report.totalAppointments}
                icon={<FiCalendar size={22} />}
              />

              <ReportCard
                title="Completed"
                value={report.completedAppointments}
                icon={<FiCalendar size={22} />}
              />

              <ReportCard
                title="Cancelled"
                value={report.cancelledAppointments}
                icon={<FiCalendar size={22} />}
              />

              <ReportCard
                title="Scheduled"
                value={report.scheduledAppointments}
                icon={<FiCalendar size={22} />}
              />
            </div>
          </section>

          {/* Treatment Summary */}
          <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
              Treatment Summary
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <ReportCard
                title="Total Treatments"
                value={report.totalTreatments}
                icon={<FiActivity size={22} />}
              />

              <ReportCard
                title="Completed Treatments"
                value={report.completedTreatments}
                icon={<FiActivity size={22} />}
              />

              <ReportCard
                title="Ongoing Treatments"
                value={report.ongoingTreatments}
                icon={<FiActivity size={22} />}
              />
            </div>
          </section>

          {/* Billing Summary */}
          <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-[#26332D]">
              Billing Summary
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ReportCard
                title="Total Bills"
                value={report.totalBills}
                icon={<FiFileText size={22} />}
              />

              <ReportCard
                title="Paid Bills"
                value={report.paidBills}
                icon={<FiDollarSign size={22} />}
              />

              <ReportCard
                title="Pending Bills"
                value={report.pendingBills}
                icon={<FiFileText size={22} />}
              />

              <ReportCard
                title="Total Revenue"
                value={formatCurrency(report.totalRevenue)}
                icon={<FiDollarSign size={22} />}
              />
            </div>

            {/* Pending Amount */}
            <div className="mt-5 rounded-2xl border border-[#A8C3B2] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64756C]">
                    Pending Amount
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#26332D]">
                    {formatCurrency(report.pendingAmount)}
                  </p>
                </div>

                <div className="rounded-xl bg-[#A8C3B2] p-3 text-[#26332D]">
                  <FiDollarSign size={24} />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Empty State */}
      {!report && !loading && (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#A8C3B2] text-[#26332D]">
            <FiBarChart2 size={30} />
          </div>

          <h3 className="text-lg font-semibold text-[#26332D]">
            No Report Generated
          </h3>

          <p className="mt-2 text-sm text-[#64756C]">
            Select a start date and end date to generate a clinic report.
          </p>
        </div>
      )}
    </div>
  );
}

/* =========================
   REPORT CARD
========================= */

function ReportCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#64756C]">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#26332D]">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-[#A8C3B2] p-3 text-[#26332D]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Reports;