// src/components/layout/AdminHeader.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/UserSlice";
import { axiosInstance } from "../../config/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserShield } from "react-icons/fa";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout", {}, { withCredentials: true });
      toast.success("Logout successful", { autoClose: 2000 });
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      dispatch(logoutUser());
      localStorage.clear();
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const navLinks = [
    { name: "Restaurants", path: "/admin/restaurants" },
    { name: "Menus", path: "/admin/menus" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <>
      <header className="bg-white shadow-md border-b fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FaUserShield className="text-red-600 text-2xl" />
            Admin<span className="text-red-600">Panel</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-all duration-150"
              >
                <FaUserShield className="text-lg" />
                Menu
                <IoIosArrowDown />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-lg overflow-hidden z-50 animate-fadeIn">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        navigate(link.path);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      {link.name}
                    </button>
                  ))}

                  <hr className="my-1" />

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setShowNav(!showNav)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {showNav && (
          <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2 border-t border-gray-100 animate-fadeInDown">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="text-gray-700 text-sm py-2 px-3 rounded hover:bg-gray-100 transition"
                onClick={() => {
                  navigate(link.path);
                  setShowNav(false);
                }}
              >
                {link.name}
              </div>
            ))}
            <div
              onClick={() => {
                setShowNav(false);
                handleLogout();
              }}
              className="text-red-600 text-sm py-2 px-3 rounded hover:bg-gray-100 transition cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}
      </header>

      <ToastContainer />
    </>
  );
};

export default AdminHeader;
