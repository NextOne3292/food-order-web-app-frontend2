import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            {/* Background Cover */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/food-banner.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Navbar */}
            <div className="relative z-10 navbar text-white px-6 py-4">
                <div className="navbar-start">
                    <a className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                        🍽️ FoodieDelight
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        <li><a onClick={() => navigate("/")}>Home</a></li>
                        <li><a onClick={() => navigate("/restaurants")}>Restaurants</a></li>
                        <li><a onClick={() => navigate("/menu")}>Menu</a></li>
                        <li><a onClick={() => navigate("/login")}>Login</a></li>
                        <li><a onClick={() => navigate("/register")}>Register</a></li>
                    </ul>
                </div>

                <div className="navbar-end flex gap-4">
                    <button className="btn btn-ghost btn-circle" onClick={() => navigate("/cart")}>
                        <div className="indicator">
                            🛒
                            <span className="badge badge-sm badge-primary indicator-item">2</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Tagline Section */}
            <div className="relative z-10 text-center text-white mt-10 p-6">
                <h1 className="text-4xl font-extrabold">"Delicious Food, Delivered to You!"</h1>
                <p className="mt-2 text-lg">Find the best restaurants and order your favorite meals effortlessly.</p>
                <button className="btn bg-red-500 hover:bg-red-700 mt-4 px-6 py-2 text-lg rounded-full" onClick={() => navigate("/restaurants")}>
                    Explore Restaurants 🍔
                </button>
            </div>
        </div>
    );
};
