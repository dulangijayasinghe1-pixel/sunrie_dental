import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import * as patientService from "../../services/patientService";
import PatientTable from "../../components/patients/PatientTable";
import SearchBar from "../../components/common/SearchBar";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function PatientList() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPatientId = (patient) => {
    return patient?.id ?? patient?.patientId;
  };

  // Load patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await patientService.getAllPatients();

        console.log(
          "Patients response:",
          response
        );

        setPatients(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load patients:",
          err
        );

        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load patients.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Search
  const handleSearch = async (value) => {
    setSearch(value);

    try {
      setLoading(true);
      setError("");

      const response = value.trim()
        ? await patientService.searchPatients(
            value.trim()
          )
        : await patientService.getAllPatients();

      console.log(
        "Patient search response:",
        response
      );

      setPatients(
        Array.isArray(response)
          ? response
          : []
      );
    } catch (err) {
      console.error(
        "Failed to search patients:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to search patients.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (patient) => {
    const patientId = getPatientId(patient);

    if (!patientId) {
      toast.error("Patient ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await patientService.deletePatient(
        patientId
      );

      toast.success(
        "Patient deleted successfully."
      );

      const response = search.trim()
        ? await patientService.searchPatients(
            search.trim()
          )
        : await patientService.getAllPatients();

      setPatients(
        Array.isArray(response)
          ? response
          : []
      );
    } catch (err) {
      console.error(
        "Failed to delete patient:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete patient.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (patient) => {
    const patientId = getPatientId(patient);

    if (!patientId) {
      toast.error("Patient ID is missing.");
      return;
    }

    navigate(`/patients/${patientId}`);
  };

  const handleEdit = (patient) => {
    const patientId = getPatientId(patient);

    if (!patientId) {
      toast.error("Patient ID is missing.");
      return;
    }

    navigate(`/patients/${patientId}/edit`);
  };

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-[#26332D]">
            Patients
          </h1>

          <p className="mt-1 text-[#64756C]">
            Manage patient records
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/patients/add")
          }
          className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
        >
          <FiPlus size={18} />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={handleSearch}
          placeholder="Search by patient name or phone..."
        />
      </div>

      {/* Content */}
      {loading ? (
        <Loading message="Loading patients..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <PatientTable
          patients={patients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default PatientList;