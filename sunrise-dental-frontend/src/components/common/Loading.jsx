import { FiLoader } from "react-icons/fi";

function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <FiLoader
        size={32}
        className="text-[#5F8D7A] animate-spin"
      />

      <p className="text-sm text-[#64756C] mt-3">
        {message}
      </p>
    </div>
  );
}

export default Loading;