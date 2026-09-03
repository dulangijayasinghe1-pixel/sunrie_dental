import { FiInbox } from "react-icons/fi";

function EmptyState({
  title = "No Data Found",
  message = "There are no records to display.",
}) {
  return (
    <div className="bg-white border border-[#A8C3B2]/40 rounded-2xl py-14 px-6 text-center">
      <div className="flex justify-center">
        <div className="bg-[#A8C3B2]/20 text-[#5F8D7A] p-4 rounded-full">
          <FiInbox size={28} />
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#26332D] mt-4">
        {title}
      </h3>

      <p className="text-sm text-[#64756C] mt-2">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;