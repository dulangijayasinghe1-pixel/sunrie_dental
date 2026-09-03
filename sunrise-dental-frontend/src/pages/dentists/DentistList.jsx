import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import * as dentistService from "../../services/dentistService";
import DentistTable from "../../components/dentists/DentistTable";
import SearchBar from "../../components/common/SearchBar";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

function DentistList() {
  const navigate = useNavigate();

  const [dentists, setDentists] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get dentist ID safely
  const getDentistId = (dentist) => {
    return dentist?.id ?? dentist?.dentistId;
  };

  // Load dentists
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await dentistService.getAllDentists();

        console.log("Dentists response:", response);

        setDentists(
          Array.isArray(response) ? response : []
        );
      } catch (err) {
        console.error(
          "Failed to load dentists:",
          err
        );

        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load dentists.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  // Search dentists
  const handleSearch = async (value) => {
    setSearch(value);

    try {
      setLoading(true);
      setError("");

      const response = value.trim()
        ? await dentistService.searchDentists(
            value.trim()
          )
        : await dentistService.getAllDentists();

      console.log("Search response:", response);

      setDentists(
        Array.isArray(response) ? response : []
      );
    } catch (err) {
      console.error(
        "Failed to search dentists:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to search dentists.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Delete dentist
  const handleDelete = async (dentist) => {
    const dentistId = getDentistId(dentist);

    if (!dentistId) {
      toast.error("Dentist ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${dentist.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await dentistService.deleteDentist(
        dentistId
      );

      toast.success(
        "Dentist deleted successfully."
      );

      // Reload table
      const response = search.trim()
        ? await dentistService.searchDentists(
            search.trim()
          )
        : await dentistService.getAllDentists();

      setDentists(
        Array.isArray(response) ? response : []
      );
    } catch (err) {
      console.error(
        "Failed to delete dentist:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete dentist.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // View dentist
  const handleView = (dentist) => {
    const dentistId = getDentistId(dentist);

    if (!dentistId) {
      toast.error("Dentist ID is missing.");
      return;
    }

    navigate(`/dentists/${dentistId}`);
  };

  // Edit dentist
  const handleEdit = (dentist) => {
    const dentistId = getDentistId(dentist);

    if (!dentistId) {
      toast.error("Dentist ID is missing.");
      return;
    }

    navigate(`/dentists/${dentistId}/edit`);
  };

  return (
    <div className="min-h-full bg-[#F7F5EF] p-6">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#26332D]">
            Dentists
          </h1>

          <p className="mt-1 text-[#64756C]">
            Manage dentist records
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dentists/add")}
          className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
        >
          <FiPlus size={18} />
          Add Dentist
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={handleSearch}
          placeholder="Search by dentist name..."
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Table */}
      {loading ? (
        <Loading message="Loading dentists..." />
      ) : (
        <DentistTable
          dentists={dentists}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default DentistList;