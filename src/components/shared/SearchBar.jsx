import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon

export default function SearchBar({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("query") || "");
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex items-center bg-white shadow-md rounded-full px-3 py-1 ${className}`}
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-transparent outline-none px-2 text-gray-700 placeholder-gray-400 text-sm w-full"
      />
      <button type="submit" className="text-red-500 hover:text-red-600 transition">
        <FaSearch size={16} />
      </button>
    </form>
  );
}
