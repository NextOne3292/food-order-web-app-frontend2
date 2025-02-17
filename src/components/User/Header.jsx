import React from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent z-50">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="text-white text-2xl font-bold">
                    <img src="/logo.png" alt="Logo" className="h-10" />
                </Link>
                
                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8 text-white">
                    <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
                    <li><Link to="/restaurants" className="hover:text-red-500 transition">Restaurants</Link></li>
                    <li><Link to="/menu" className="hover:text-red-500 transition">Menu</Link></li>
                    <li><Link to="/login" className="hover:text-red-500 transition">Login</Link></li>
                    <li><Link to="/register" className="hover:text-red-500 transition">Register</Link></li>
                </ul>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Mobile Navigation */}
                <div
                    className={`fixed inset-0 bg-black/80 transform ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform md:hidden flex flex-col items-center justify-center space-y-6 text-white`}
                >
                    <button
                        className="absolute top-6 right-6 text-white text-xl"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ✖
                    </button>
                    <ul className="text-lg">
                        <li><Link to="/" className="hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/restaurants" className="hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Restaurants</Link></li>
                        <li><Link to="/menu" className="hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Menu</Link></li>
                        <li><Link to="/login" className="hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                        <li><Link to="/register" className="hover:text-red-500 transition" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
