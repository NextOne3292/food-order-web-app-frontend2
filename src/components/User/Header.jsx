import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/UserSlice"; // Correct import
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../shared/SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Correct selector
  const isAuthenticated = !!user; // Convert to boolean

  const handleLogout = () => {
    dispatch(logoutUser()); // Logout user
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Food<span className="text-red-500">Order</span>
        </Link>

        {/* ✅ Desktop Search Bar */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 pb-1 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 pb-1 transition-all duration-300"
          >
            About
          </Link>
        </nav>

        {/* Cart, Login/Signup OR Logout */}
        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="text-2xl text-gray-700 hover:text-red-500 transition duration-300"
          >
            <FaShoppingCart />
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Signup
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 absolute top-16 right-4 w-[55%] max-w-[200px] text-center rounded-lg">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-red-500 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-red-500 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full py-2 text-gray-700 hover:text-red-500 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-red-500 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-gray-700 hover:text-red-500 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
              
        <div className="md:hidden px-6 py-2 bg-white shadow">
          <SearchBar />
        </div>
      
            </>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
