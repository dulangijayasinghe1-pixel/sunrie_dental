import { FiAlertTriangle, FiX } from "react-icons/fi";

function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 text-red-500 p-3 rounded-full">
              <FiAlertTriangle size={22} />
            </div>

            <h3 className="text-lg font-bold text-[#26332D]">
              {title}
            </h3>
          </div>

          <button
            onClick={onCancel}
            className="text-[#64756C] hover:text-[#26332D] transition"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Message */}
        <p className="text-[#64756C] text-sm leading-6 mt-5">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-7">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-[#A8C3B2] text-[#26332D] hover:bg-[#F7F5EF] transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;