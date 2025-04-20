// src/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🧭 Header with dropdown */}
      <AdminHeader />

      {/* ⚙️ Main content (pushed below fixed header) */}
      <main className="pt-20 px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
