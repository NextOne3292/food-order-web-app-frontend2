import React, { useState } from "react";
import { motion } from "framer-motion";
import { Carrousel } from "../../components/user/Carrousel";

export const Home = () => {
    const [user, setUser] = useState("user");

    return (
        <div className="px-6 md:px-20">
            {/* Hero Section */}
            <section className="min-h-[500px] flex flex-col md:flex-row items-center gap-12 py-10">
                {/* Left Content */}
                <motion.div
                    className="w-full md:w-7/12 text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-bold text-4xl md:text-5xl leading-tight text-gray-900 dark:text-white">
                        Welcome <span className="text-red-500">{user}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4">
                        Discover the best restaurants and order your favorite meals in just a few clicks. Indulge in a world of flavors!
                    </p>
                    <button className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition">
                        Explore Now
                    </button>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="w-full md:w-5/12"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        className="w-full rounded-xl shadow-lg"
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="home-image"
                    />
                </motion.div>
            </section>

            {/* Feature Section */}
            <section className="my-24 py-12 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Why Choose <span className="text-red-500">FoodOrder?</span>
                </motion.h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We bring you the best dining experience, with top-rated restaurants, delicious cuisines, and easy ordering.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-10">
                    {/* Feature Cards */}
                    <motion.div
                        className="w-72 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md transition transform hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Top Restaurants</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Find highly rated restaurants near you.</p>
                    </motion.div>

                    <motion.div
                        className="w-72 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md transition transform hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Fast Delivery</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Get your food delivered quickly and hassle-free.</p>
                    </motion.div>

                    <motion.div
                        className="w-72 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md transition transform hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Best Deals</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Enjoy exclusive discounts and offers.</p>
                    </motion.div>
                </div>
            </section>

            {/* Carrousel Section */}
            <section className="my-24">
                <Carrousel />
            </section>
        </div>
    );
};
