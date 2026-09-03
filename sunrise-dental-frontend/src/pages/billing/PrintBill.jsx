import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiPrinter,
} from "react-icons/fi";
import { toast } from "react-toastify";

import * as billService from "../../services/billService";

function PrintBill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let objectUrl = "";

    const loadPdf = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await billService.printBill(id);

        const blob =
          response instanceof Blob
            ? response
            : new Blob(
                [response],
                {
                  type: "application/pdf",
                }
              );

        objectUrl =
          window.URL.createObjectURL(blob);

        setPdfUrl(objectUrl);
      } catch (err) {
        console.error(
          "Failed to load PDF:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Failed to load bill PDF."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (objectUrl) {
        window.URL.revokeObjectURL(
          objectUrl
        );
      }
    };
  }, [id]);

  const handlePrint = () => {
    if (!pdfUrl) {
      toast.error(
        "PDF is not ready."
      );
      return;
    }

    const printWindow =
      window.open(
        pdfUrl,
        "_blank"
      );

    if (!printWindow) {
      toast.error(
        "Please allow pop-ups to print the bill."
      );
      return;
    }

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-[#64756C]">
        Loading PDF...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">

        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(`/billing/${id}`)
          }
          className="btn"
        >
          Back
        </button>

      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b bg-white p-4">

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate(`/billing/${id}`)
            }
            className="rounded-lg p-2 hover:bg-[#A8C3B2]/20"
          >
            <FiArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-[#26332D]">
              Print Bill #{id}
            </h1>
          </div>

        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
        >
          <FiPrinter size={17} />
          Print
        </button>

      </div>

      {/* PDF */}
      <div className="flex-1 bg-gray-100">

        {pdfUrl && (
          <iframe
            src={pdfUrl}
            title={`Bill ${id}`}
            className="h-full w-full border-0"
          />
        )}

      </div>

    </div>
  );
}

export default PrintBill;