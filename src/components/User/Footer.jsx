import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Quick Links */}
                <nav>
                    <h6 className="text-xl font-semibold mb-4 uppercase tracking-wide">Quick Links</h6>
                    <ul className="space-y-3">
                        <li><Link className="hover:text-primary transition" to="/">Home</Link></li>
                        <li><Link className="hover:text-primary transition" to="/restaurants">Restaurants</Link></li>
                        <li><Link className="hover:text-primary transition" to="/menu">Menu</Link></li>
                        <li><Link className="hover:text-primary transition" to="/contact">Contact Us</Link></li>
                    </ul>
                </nav>

                {/* Customer Service */}
                <nav>
                    <h6 className="text-xl font-semibold mb-4 uppercase tracking-wide">Customer Service</h6>
                    <ul className="space-y-3">
                        <li><Link className="hover:text-primary transition" to="/faqs">FAQs</Link></li>
                        <li><Link className="hover:text-primary transition" to="/order-tracking">Track Order</Link></li>
                        <li><Link className="hover:text-primary transition" to="/support">Support</Link></li>
                    </ul>
                </nav>

                {/* Legal */}
                <nav>
                    <h6 className="text-xl font-semibold mb-4 uppercase tracking-wide">Legal</h6>
                    <ul className="space-y-3">
                        <li><Link className="hover:text-primary transition" to="/terms">Terms & Conditions</Link></li>
                        <li><Link className="hover:text-primary transition" to="/privacy">Privacy Policy</Link></li>
                        <li><Link className="hover:text-primary transition" to="/cookies">Cookie Policy</Link></li>
                    </ul>
                </nav>

                {/* Newsletter */}
                <div>
                    <h6 className="text-xl font-semibold mb-4 uppercase tracking-wide">Subscribe to Offers</h6>
                    <p className="text-gray-400 text-sm mb-4">Get exclusive discounts and food deals delivered to your inbox.</p>
                    <div className="flex">
                        <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full text-gray-800 rounded-l-md focus:outline-none" />
                        <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="mt-10 flex justify-center space-x-6">
                <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 transition duration-300">
                    <FaFacebook size={28} />
                </a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition duration-300">
                    <FaInstagram size={28} />
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition duration-300">
                    <FaTwitter size={28} />
                </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm mt-6">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-white">FoodieExpress</span>. All rights reserved.
            </div>
        </footer>
    );
};
