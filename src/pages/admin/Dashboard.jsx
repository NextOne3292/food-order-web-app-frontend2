// src/pages/admin/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/images/signup-bgg.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* Main Card */}
      <div className="relative z-10 bg-white/50 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl px-6 sm:px-10 py-10 sm:py-12 text-center w-full max-w-md sm:max-w-xl animate-fadeIn">
        {/* Logo (same as clientside) */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide flex justify-center items-center gap-2 mb-4">
          <span role="img" aria-label="cutlery">🍽️</span>
          <span>
            Food<span className="text-red-500">Order</span>
          </span>
        </h2>

        {/* Welcome Message */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Welcome, <span className="text-blue-600">Admin</span> 👋
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          You are now in the admin panel. Manage everything at your fingertips.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
