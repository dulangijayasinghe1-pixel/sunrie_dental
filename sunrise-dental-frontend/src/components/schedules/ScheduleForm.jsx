import { useState } from "react";

function ScheduleForm({
  dentists = [],
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Schedule",
}) {
  const [formData, setFormData] = useState({
    dentistId: initialData.dentistId
      ? String(initialData.dentistId)
      : "",
    dayOfWeek: initialData.dayOfWeek || "",
    startTime: initialData.startTime || "",
    endTime: initialData.endTime || "",
    available:
      initialData.available !== undefined
        ? initialData.available
        : true,
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scheduleData = {
      dentistId: Number(formData.dentistId),
      dayOfWeek: formData.dayOfWeek,
      startTime: formData.startTime,
      endTime: formData.endTime,
      available: formData.available,
      notes: formData.notes.trim() || null,
    };

    onSubmit(scheduleData);
  };

  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Dentist */}
      <div>
        <label className="mb-2 block font-medium text-[#26332D]">
          Dentist
        </label>

        <select
          name="dentistId"
          value={formData.dentistId}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Dentist</option>

          {dentists.map((dentist) => (
            <option key={dentist.id} value={dentist.id}>
              {dentist.name}
            </option>
          ))}
        </select>
      </div>

      {/* Day */}
      <div>
        <label className="mb-2 block font-medium text-[#26332D]">
          Day of Week
        </label>

        <select
          name="dayOfWeek"
          value={formData.dayOfWeek}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Day</option>

          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day.charAt(0) + day.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Start Time */}
      <div>
        <label className="mb-2 block font-medium text-[#26332D]">
          Start Time
        </label>

        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      {/* End Time */}
      <div>
        <label className="mb-2 block font-medium text-[#26332D]">
          End Time
        </label>

        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      {/* Available */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
          className="checkbox"
        />

        <label className="font-medium text-[#26332D]">
          Available
        </label>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 block font-medium text-[#26332D]">
          Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          maxLength={255}
          rows={4}
          className="textarea textarea-bordered w-full"
          placeholder="Optional notes"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn w-full bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
      >
        {loading ? "Saving..." : submitText}
      </button>

    </form>
  );
}

export default ScheduleForm;