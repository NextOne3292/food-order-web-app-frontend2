import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { EditProfileForm } from "../../components/user/EditProfileForm";
import { motion } from "framer-motion";
import { FaEdit, FaSignOutAlt, FaShoppingBag } from "react-icons/fa";

export const Profile = () => {
    const [profileData, isLoading, error] = useFetch("/user/profile");
    const [isProfileEdit, setIsProfileEdit] = useState(false);

    const handleLogOut = async () => {
        try {
            await axiosInstance.get("/user/logout");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-6 md:px-20 py-10">
            {/* Profile Header */}
            <section className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
                <motion.img
                    src={profileData?.profilePic || "https://via.placeholder.com/150"}
                    alt="profileImage"
                    className="w-32 h-32 rounded-full shadow-md border-4 border-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                        {profileData?.name || "User"}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{profileData?.email}</p>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{profileData?.mobile}</p>
                </div>
            </section>

            {/* Buttons Section */}
            <section className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
                    <FaShoppingBag /> My Orders
                </button>
                <button 
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
                    onClick={() => setIsProfileEdit(!isProfileEdit)}
                >
                    <FaEdit /> Edit Profile
                </button>
                <button 
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow-md transition"
                    onClick={handleLogOut}
                >
                    <FaSignOutAlt /> Logout
                </button>
            </section>

            {/* Edit Profile Form */}
            {isProfileEdit && (
                <motion.section
                    className="mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <EditProfileForm />
                </motion.section>
            )}
        </div>
    );
};
