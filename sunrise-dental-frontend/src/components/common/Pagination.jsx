import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-[#A8C3B2] text-[#26332D] hover:bg-[#F7F5EF] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft size={18} />
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-10 h-10 px-3 rounded-lg font-medium transition ${
            currentPage === page
              ? "bg-[#5F8D7A] text-white"
              : "border border-[#A8C3B2] text-[#26332D] hover:bg-[#F7F5EF]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-[#A8C3B2] text-[#26332D] hover:bg-[#F7F5EF] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;