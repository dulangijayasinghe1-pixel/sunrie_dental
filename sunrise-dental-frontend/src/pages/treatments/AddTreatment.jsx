import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TreatmentForm from "../../components/treatments/TreatmentForm";

import * as treatmentService from "../../services/treatmentService";
import * as patientService from "../../services/patientService";
import * as dentistService from "../../services/dentistService";
import * as appointmentService from "../../services/appointmentService";

function AddTreatment() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoadingData(true);
        setError("");

        const [patientResponse, dentistResponse, appointmentResponse] =
          await Promise.all([
            patientService.getAllPatients(),
            dentistService.getAllDentists(),
            appointmentService.getAllAppointments(),
          ]);

        console.log("Patients response:", patientResponse);
        console.log("Dentists response:", dentistResponse);
        console.log("Appointments response:", appointmentResponse);

        // Handle different possible API response formats
        const patientData = Array.isArray(patientResponse)
          ? patientResponse
          : Array.isArray(patientResponse?.data)
          ? patientResponse.data
          : Array.isArray(patientResponse?.content)
          ? patientResponse.content
          : [];

        const dentistData = Array.isArray(dentistResponse)
          ? dentistResponse
          : Array.isArray(dentistResponse?.data)
          ? dentistResponse.data
          : Array.isArray(dentistResponse?.content)
          ? dentistResponse.content
          : [];

        const appointmentData = Array.isArray(appointmentResponse)
          ? appointmentResponse
          : Array.isArray(appointmentResponse?.data)
          ? appointmentResponse.data
          : Array.isArray(appointmentResponse?.content)
          ? appointmentResponse.content
          : [];

        console.log("Patients final:", patientData);
        console.log("Dentists final:", dentistData);
        console.log("Appointments final:", appointmentData);

        if (!cancelled) {
          setPatients(patientData);
          setDentists(dentistData);
          setAppointments(appointmentData);
        }
      } catch (err) {
        console.error("Load treatment data error:", err);

        if (!cancelled) {
          const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Failed to load patients, dentists and appointments.";

          setError(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) {
          setLoadingData(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (treatmentData) => {
    try {
      setLoading(true);
      setError("");

      console.log("Creating treatment:", treatmentData);

      await treatmentService.createTreatment(treatmentData);

      toast.success("Treatment created successfully.");

      navigate("/treatments");
    } catch (err) {
      console.error("Create treatment error:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to create treatment.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#26332D]">
          Add Treatment
        </h1>

        <p className="mt-1 text-[#64756C]">
          Add a new treatment for a patient
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loadingData ? (
        <div className="rounded-2xl border border-[#D9E4DE] bg-white p-10 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-md text-[#5F8D7A]" />

            <p className="mt-3 text-sm text-[#64756C]">
              Loading patients, dentists and appointments...
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <TreatmentForm
            patients={patients}
            dentists={dentists}
            appointments={appointments}
            onSubmit={handleSubmit}
            loading={loading}
            submitText="Create Treatment"
          />
        </div>
      )}
    </div>
  );
}

export default AddTreatment;