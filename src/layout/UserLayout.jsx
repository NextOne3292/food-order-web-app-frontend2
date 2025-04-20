import React from "react";
import Header from "../components/user/Header";
import  Footer from "../components/user/Footer";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4 "> 
                <Outlet /> {/* Renders the current route content */}
            </main>
            <Footer />
        </div>
    );
};
