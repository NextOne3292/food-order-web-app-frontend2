import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../shared/SearchBar";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout", {}, { withCredentials: true });
      toast.success("Logout successful", { autoClose: 2000 });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.info("Session already expired. Logging out...");
      } else {
        toast.error("Logout failed. Please try again.");
        return;
      }
    } finally {
      dispatch(logoutUser());
      localStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Food<span className="text-red-500">Order</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
            <Link to="/" className="text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 pb-1 transition-all duration-300">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-red-500 border-b-2 border-transparent hover:border-red-500 pb-1 transition-all duration-300">
              About
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative text-2xl text-gray-700 hover:text-red-500 transition duration-300">
              <FaShoppingCart />
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Icon */}
            {isAuthenticated && (
              <div className="relative">
                  <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
                  onClick={() => {
                    if (window.innerWidth >= 768) {
                      setUserMenuOpen((prev) => !prev);
                    }
                  }}
                />

                {/* Dropdown only in desktop view */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 text-sm text-gray-700 hidden md:block">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm text-gray-500">👋 Hello</p>
                      <p className="font-medium truncate">{user?.name}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons (Desktop) */}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="hidden md:block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
                  Login
                </Link>
                <Link to="/signup" className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                  Signup
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-16 right-4 w-[55%] max-w-[250px] text-center rounded-lg z-40">
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="py-2 text-gray-700 hover:text-red-500 transition-all duration-300">
                Home
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="py-2 text-gray-700 hover:text-red-500 transition-all duration-300">
                About
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-gray-700 hover:text-red-500 transition duration-300"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-gray-700 hover:text-red-500 transition duration-300"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Signup
                  </Link>
                </>
              )}

              {/* Mobile SearchBar */}
              <div className="mt-4">
                <SearchBar />
              </div>
            </nav>
          </div>
        )}
      </header>

      <ToastContainer />
    </>
  );
};

export default Header;
