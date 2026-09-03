import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleForm from "../../components/schedules/ScheduleForm";
import  * as scheduleService from "../../services/scheduleService";
import * as dentistService from "../../services/dentistService";

function AddSchedule() {
  const navigate = useNavigate();

  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDentists, setLoadingDentists] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadDentists = async () => {
      try {
        setLoadingDentists(true);
        setError("");

        const data = await dentistService.getAllDentists();

        if (!cancelled) {
          setDentists(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load dentists."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingDentists(false);
        }
      }
    };

    loadDentists();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (scheduleData) => {
    try {
      setLoading(true);
      setError("");

      await scheduleService.createSchedule(scheduleData);

      navigate("/schedules");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create schedule."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#26332D]">
          Add Schedule
        </h1>

        <p className="mt-1 text-[#64756C]">
          Create a working schedule for a dentist
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {loadingDentists ? (
        <div className="rounded-xl border border-[#A8C3B2] bg-white p-8 text-center text-[#64756C] shadow-sm">
          Loading dentists...
        </div>
      ) : (
        <div className="max-w-2xl rounded-xl border border-[#A8C3B2] bg-white p-6 shadow-sm">
          <ScheduleForm
            dentists={dentists}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Create Schedule"
          />
        </div>
      )}
    </div>
  );
}

export default AddSchedule;