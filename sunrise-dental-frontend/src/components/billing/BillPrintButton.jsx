import { FiPrinter } from "react-icons/fi";
import { toast } from "react-toastify";

import * as billService from "../../services/billService";

function BillPrintButton({
  billId,
  label = "Print Bill",
}) {
  const handlePrint = async () => {
    try {
      const pdfData =
        await billService.printBill(
          billId
        );

      const blob =
        pdfData instanceof Blob
          ? pdfData
          : new Blob(
              [pdfData],
              {
                type: "application/pdf",
              }
            );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const printWindow =
        window.open(
          url,
          "_blank"
        );

      if (!printWindow) {
        toast.error(
          "Please allow pop-ups to print the bill."
        );

        window.URL.revokeObjectURL(
          url
        );

        return;
      }

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

    } catch (error) {
      console.error(
        "Error printing bill:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to print bill."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="btn border-none bg-[#5F8D7A] text-white hover:bg-[#4F7968]"
    >
      <FiPrinter size={17} />
      {label}
    </button>
  );
}

export default BillPrintButton;