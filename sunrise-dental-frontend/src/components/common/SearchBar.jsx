import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64756C]"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#A8C3B2] bg-white text-[#26332D] placeholder:text-[#64756C]/70 focus:outline-none focus:border-[#5F8D7A] focus:ring-1 focus:ring-[#5F8D7A]"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64756C] hover:text-[#26332D]"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;