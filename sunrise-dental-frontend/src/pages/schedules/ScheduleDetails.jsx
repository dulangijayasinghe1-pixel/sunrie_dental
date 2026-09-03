import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

import * as scheduleService from "../../services/scheduleService";
import Loading from "../../components/common/Loading";

function ScheduleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadSchedule = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await scheduleService.getScheduleById(id);

        if (!cancelled) {
          setSchedule(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load schedule."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSchedule();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${schedule?.dentistName || "this"}'s schedule?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await scheduleService.deleteSchedule(id);

      toast.success("Schedule deleted successfully.");

      navigate("/schedules");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete schedule."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading />
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate("/schedules")}
          className="mb-5 flex items-center gap-2 text-[#5F8D7A] hover:underline"
        >
          <FiArrowLeft />
          Back to Schedules
        </button>

        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          {error || "Schedule not found."}
        </div>
      </div>
    );
  }

  const dentistName =
    schedule.dentistName ||
    schedule.dentist?.name ||
    "-";

  const day =
    schedule.dayOfWeek
      ? schedule.dayOfWeek.charAt(0) +
        schedule.dayOfWeek.slice(1).toLowerCase()
      : "-";

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/schedules")}
            className="mb-3 flex items-center gap-2 text-sm text-[#5F8D7A] hover:underline"
          >
            <FiArrowLeft size={17} />
            Back to Schedules
          </button>

          <h1 className="text-2xl font-bold text-[#26332D]">
            Schedule Details
          </h1>

          <p className="mt-1 text-[#64756C]">
            View dentist working schedule
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              navigate(`/schedules/${id}/edit`)
            }
            className="btn border-0 bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
          >
            <FiEdit2 size={17} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="btn border-0 bg-red-500 text-white hover:bg-red-600"
          >
            <FiTrash2 size={17} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="max-w-3xl rounded-xl border border-[#A8C3B2] bg-white shadow-sm">
        <div className="border-b border-[#A8C3B2]/40 px-6 py-5">
          <h2 className="text-lg font-semibold text-[#26332D]">
            Schedule Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          {/* Dentist */}
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#A8C3B2]/30 p-3">
              <FiUser
                size={20}
                className="text-[#5F8D7A]"
              />
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Dentist
              </p>
              <p className="mt-1 font-semibold text-[#26332D]">
                {dentistName}
              </p>
            </div>
          </div>

          {/* Day */}
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#A8C3B2]/30 p-3">
              <FiCalendar
                size={20}
                className="text-[#5F8D7A]"
              />
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Day
              </p>
              <p className="mt-1 font-semibold text-[#26332D]">
                {day}
              </p>
            </div>
          </div>

          {/* Start Time */}
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#A8C3B2]/30 p-3">
              <FiClock
                size={20}
                className="text-[#5F8D7A]"
              />
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                Start Time
              </p>
              <p className="mt-1 font-semibold text-[#26332D]">
                {schedule.startTime || "-"}
              </p>
            </div>
          </div>

          {/* End Time */}
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#A8C3B2]/30 p-3">
              <FiClock
                size={20}
                className="text-[#5F8D7A]"
              />
            </div>

            <div>
              <p className="text-sm text-[#64756C]">
                End Time
              </p>
              <p className="mt-1 font-semibold text-[#26332D]">
                {schedule.endTime || "-"}
              </p>
            </div>
          </div>

          {/* Availability */}
          <div>
            <p className="text-sm text-[#64756C]">
              Availability
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                schedule.available
                  ? "bg-[#A8C3B2] text-[#26332D]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {schedule.available
                ? "Available"
                : "Unavailable"}
            </span>
          </div>

          {/* Schedule ID */}
          <div>
            <p className="text-sm text-[#64756C]">
              Schedule ID
            </p>

            <p className="mt-1 font-semibold text-[#26332D]">
              {schedule.scheduleId || id}
            </p>
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <p className="text-sm text-[#64756C]">
              Notes
            </p>

            <div className="mt-2 rounded-lg bg-[#F7F5EF] p-4 text-[#26332D]">
              {schedule.notes || "No notes available."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleDetails;