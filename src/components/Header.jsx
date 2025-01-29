import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow">
      {/* Top Section */}
      <header className="bg-white shadow">
  {/* Top Section */}
  <div className="text-center py-6"> {/* Reduced padding */}
    <h1 className="text-2xl font-semibold">Welcome to FoodOrder</h1> {/* Smaller font size */}
    <p className="text-sm mt-2 text-gray-600"> {/* Smaller font size and reduced margin */}
      Order from your favorite restaurants with ease
    </p>
  </div>
</header>


      {/* Navigation Section */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-50">
        <div className="logo text-xl font-bold text-gray-800">Foodie</div>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="text-gray-700 hover:text-red-500">
              Home
            </a>
          </li>
          <li>
            <a href="#restaurants" className="text-gray-700 hover:text-red-500">
              Restaurants
            </a>
          </li>
          <li>
            <a href="#menu" className="text-gray-700 hover:text-red-500">
              Menu
            </a>
          </li>
          
          <li>
            <a href="#register" className="text-gray-700 hover:text-red-500">
              Register
            </a>
          </li>
          <li>
            <a href="#login" className="text-gray-700 hover:text-red-500">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
