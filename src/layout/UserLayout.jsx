import React from "react";
import UserHeader from "../components/user/UserHeader";  // Corrected import
import Footer from "../components/user/Footer";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <UserHeader />  {/* Corrected component name */}
            <main className="flex-grow container mx-auto p-4 "> 
                <Outlet /> {/* Renders the current route content */}
            </main>
            <Footer />
        </div>
    );
};

