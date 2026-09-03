import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import ScheduleForm from "../../components/schedules/ScheduleForm";
import * as scheduleService from "../../services/scheduleService";
import * as dentistService from "../../services/dentistService";

function EditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [scheduleData, dentistData] = await Promise.all([
          scheduleService.getScheduleById(id),
          dentistService.getAllDentists(),
        ]);

        console.log("Schedule data:", scheduleData);
        console.log("Dentists data:", dentistData);

        if (!cancelled) {
          setSchedule(scheduleData);

          setDentists(
            Array.isArray(dentistData) ? dentistData : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Load schedule error:", err);

          const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Failed to load schedule.";

          setError(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");

      console.log("Updating schedule:", formData);

      await scheduleService.updateSchedule(id, formData);

      toast.success("Schedule updated successfully.");

      navigate("/schedules");
    } catch (err) {
      console.error("Update schedule error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update schedule.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-[#A8C3B2] bg-white py-12 text-center text-[#64756C] shadow-sm">
          Loading schedule...
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate("/schedules")}
          className="mb-5 flex items-center gap-2 text-[#5F8D7A] hover:underline"
        >
          <FiArrowLeft size={18} />
          Back to Schedules
        </button>

        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {error || "Schedule not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/schedules")}
        className="mb-5 flex items-center gap-2 text-sm text-[#5F8D7A] hover:underline"
      >
        <FiArrowLeft size={17} />
        Back to Schedules
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#26332D]">
          Edit Schedule
        </h1>

        <p className="mt-1 text-[#64756C]">
          Update dentist working schedule
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="max-w-2xl rounded-xl border border-[#A8C3B2] bg-white p-6 shadow-sm">
        <ScheduleForm
          dentists={dentists}
          initialData={schedule}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Update Schedule"
        />
      </div>
    </div>
  );
}

export default EditSchedule;