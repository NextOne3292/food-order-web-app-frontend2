import React from "react";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export const UserHeader = () => {
    return (
        <header
        className="relative w-full h-20 shadow-md bg-cover bg-center"
        style={{ backgroundImage: `url("/cover.jpg")` }}
      >
      
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Navigation Bar */}
            <div className="relative flex justify-between items-center w-full px-6 md:px-10 h-20 text-white">
                {/* Logo */}
                <Link to={"/"}>
                    <motion.div 
                        className="text-3xl md:text-4xl font-extrabold text-red-500 drop-shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        FoodOrder
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 font-semibold">
                    <Link to={"/"} className="hover:text-red-400 transition">Home</Link>
                    <Link to={"/restaurants"} className="hover:text-red-400 transition">Restaurants</Link>
                    <Link to={"/menu"} className="hover:text-red-400 transition">Menu</Link>
                    <Link to={"/orders"} className="hover:text-red-400 transition">My Orders</Link>
                </nav>

                {/* Icons */}
                <div className="flex gap-4 md:gap-6 items-center">
                    {/* Cart with Badge */}
                    <Link to={"/cart"} className="relative group">
                        <ShoppingBag className="text-white group-hover:text-red-400 transition" size={24} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                    </Link>

                    {/* Profile */}
                    <Link to={"/profile"}>
                        <CircleUser className="text-white hover:text-red-400 transition" size={26} />
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-center py-2 bg-black bg-opacity-80">
                <nav className="flex gap-6 text-lg font-semibold">
                    <Link to={"/"} className="hover:text-red-400 transition">Home</Link>
                    <Link to={"/restaurants"} className="hover:text-red-400 transition">Restaurants</Link>
                    <Link to={"/menu"} className="hover:text-red-400 transition">Menu</Link>
                    <Link to={"/orders"} className="hover:text-red-400 transition">My Orders</Link>
                </nav>
            </div>
        </header>
    );
};
