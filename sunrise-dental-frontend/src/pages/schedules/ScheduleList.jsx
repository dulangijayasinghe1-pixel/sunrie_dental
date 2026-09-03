import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";

import ScheduleTable from "../../components/schedules/ScheduleTable";
import * as scheduleService from "../../services/scheduleService";

function ScheduleList() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadSchedules = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await scheduleService.getAllSchedules();

        if (!cancelled) {
          setSchedules(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err.response?.data?.message ||
            "Failed to load schedules.";

          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSchedules();

    return () => {
      cancelled = true;
    };
  }, []);

  // Refresh schedules
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await scheduleService.getAllSchedules();

      setSchedules(Array.isArray(data) ? data : []);

      toast.success("Schedules refreshed.");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to refresh schedules.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // View
  const handleView = (schedule) => {
    const scheduleId =
      schedule.scheduleId ?? schedule.id;

    if (!scheduleId) {
      toast.error("Schedule ID not found.");
      return;
    }

    navigate(`/schedules/${scheduleId}`);
  };

  // Edit
  const handleEdit = (schedule) => {
    const scheduleId =
      schedule.scheduleId ?? schedule.id;

    if (!scheduleId) {
      toast.error("Schedule ID not found.");
      return;
    }

    navigate(`/schedules/${scheduleId}/edit`);
  };

  // Delete
  const handleDelete = async (schedule) => {
    const scheduleId =
      schedule.scheduleId ?? schedule.id;

    if (!scheduleId) {
      toast.error("Schedule ID not found.");
      return;
    }

    const dentistName =
      schedule.dentistName ||
      schedule.dentist?.name ||
      "this dentist";

    const confirmed = window.confirm(
      `Are you sure you want to delete ${dentistName}'s schedule?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await scheduleService.deleteSchedule(scheduleId);

      setSchedules((prev) =>
        prev.filter(
          (item) =>
            (item.scheduleId ?? item.id) !== scheduleId
        )
      );

      toast.success("Schedule deleted successfully.");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to delete schedule.";

      setError(message);
      toast.error(message);
    }
  };

  // Available / Unavailable
  const handleToggleAvailability = async (schedule) => {
    const scheduleId =
      schedule.scheduleId ?? schedule.id;

    if (!scheduleId) {
      toast.error("Schedule ID not found.");
      return;
    }

    try {
      setError("");

      const updated =
        await scheduleService.updateScheduleAvailability(
          scheduleId,
          !schedule.available
        );

      setSchedules((prev) =>
        prev.map((item) =>
          (item.scheduleId ?? item.id) === scheduleId
            ? updated
            : item
        )
      );

      toast.success(
        !schedule.available
          ? "Schedule marked as available."
          : "Schedule marked as unavailable."
      );
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to update availability.";

      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#26332D]">
            Dentist Schedules
          </h1>

          <p className="mt-1 text-[#64756C]">
            Manage dentist working schedules
          </p>
        </div>

        <div className="flex gap-2">
          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="btn border border-[#A8C3B2] bg-white text-[#26332D] hover:bg-[#F7F5EF]"
            title="Refresh schedules"
          >
            <FiRefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>

          {/* Add Schedule */}
          <button
            type="button"
            onClick={() => navigate("/schedules/add")}
            className="btn border-0 bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
          >
            <FiPlus size={18} />

            Add Schedule
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-xl border border-[#A8C3B2] bg-white py-12 text-center text-[#64756C] shadow-sm">
          Loading schedules...
        </div>
      ) : (
        <ScheduleTable
          schedules={schedules}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleAvailability={handleToggleAvailability}
        />
      )}
    </div>
  );
}

export default ScheduleList;