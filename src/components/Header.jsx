import { Link } from "react-router-dom"; 
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";
import logo from "/src/assets/logo.png"; // Logo image
import background from "/src/assets/header-bg.jpg"; // Background image

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="relative bg-cover bg-center h-[200px] shadow-md sticky top-0 z-50"
      style={{ 
        backgroundImage: `url(${background})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.7)" // Dark overlay
      }}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Foodie" className="h-14" />
          <Link to="/" className="text-3xl font-bold text-white">
            Foodie
          </Link>
        </div>

        {/* Right - Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-white">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/restaurants" className="hover:text-red-400">Restaurants</Link>
          <Link to="/cart" className="hover:text-red-400">
            <FaShoppingCart size={22} />
          </Link>
          <Link to="/login" className="hover:text-red-400 flex items-center gap-1">
            <FaUser size={18} />
            Login
          </Link>
          <Link to="/signup" className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600">
            Signup
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Centered Search Bar */}
      
{/* Centered Search Bar */}
<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] md:w-[50%]">
  <div className="bg-white rounded-lg px-4 py-2 shadow-md flex">
    <input
      type="text"
      placeholder="Search for restaurants, cuisine..."
      className="w-full outline-none text-gray-900 placeholder-gray-600 bg-transparent"
    />
  </div>
</div>



      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-80 text-white flex flex-col items-center py-4 space-y-4">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/restaurants" className="hover:text-red-400">Restaurants</Link>
          <Link to="/cart" className="hover:text-red-400 flex items-center gap-2">
            <FaShoppingCart size={20} />
            Cart
          </Link>
          <Link to="/login" className="hover:text-red-400 flex items-center gap-2">
            <FaUser size={18} />
            Login
          </Link>
          <Link to="/signup" className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600">
            Signup
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
