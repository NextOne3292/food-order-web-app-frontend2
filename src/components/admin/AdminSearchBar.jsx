import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AdminSearchBar = ({ onSearch, className }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center bg-white shadow-md rounded-full px-3 py-1 ${className}`}
    >
      <input
        type="text"
        placeholder="Search by name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow bg-transparent outline-none px-2 text-gray-700 placeholder-gray-400 text-sm w-full"
      />
      <button type="submit" className="text-red-500 hover:text-red-600 transition">
        <FaSearch size={16} />
      </button>
    </form>
  );
};

export default AdminSearchBar;
