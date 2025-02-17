import React from "react";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            {/* Background Cover */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/admin-banner.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            {/* Navbar */}
            <div className="relative z-10 navbar text-white px-6 py-4">
                <div className="navbar-start">
                    <a className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                        🔥 Admin Dashboard
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        <li><a onClick={() => navigate("/admin/dashboard")}>Dashboard</a></li>
                        <li><a onClick={() => navigate("/admin/users")}>Users</a></li>
                        <li><a onClick={() => navigate("/admin/orders")}>Orders</a></li>
                        <li><a onClick={() => navigate("/admin/restaurants")}>Restaurants</a></li>
                        <li><a onClick={() => navigate("/admin/menus")}>Menus</a></li>
                        <li><a onClick={() => navigate("/admin/coupons")}>Coupons</a></li>
                    </ul>
                </div>

                <div className="navbar-end flex gap-4">
                    <button className="btn btn-ghost btn-circle" onClick={() => navigate("/admin/notifications")}>
                        🔔 <span className="badge badge-xs badge-error indicator-item"></span>
                    </button>
                </div>
            </div>

            {/* Tagline Section */}
            <div className="relative z-10 text-center text-white mt-10 p-6">
                <h1 className="text-3xl font-extrabold">"Manage, Control, and Grow Your Business!"</h1>
                <p className="mt-2 text-lg">A powerful dashboard to oversee restaurants, orders, and users.</p>
            </div>
        </div>
    );
};
