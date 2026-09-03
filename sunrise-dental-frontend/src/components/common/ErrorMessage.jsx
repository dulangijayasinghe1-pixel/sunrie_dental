import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
      <div className="flex justify-center">
        <div className="bg-red-100 text-red-500 p-3 rounded-full">
          <FiAlertCircle size={24} />
        </div>
      </div>

      <p className="text-red-600 font-medium mt-3">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 bg-[#5F8D7A] hover:bg-[#4F7968] text-white px-4 py-2 rounded-lg transition"
        >
          <FiRefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;