import React from "react";
import { Footer } from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../components/Admin/AdminHeader";
import { Header } from "../components/Admin/Header";

export const AdminLayout = () => {
    const isUserAuth = true;

    return (
        <div>
            {isUserAuth ? <AdminHeader/> : <Header />}

            <div className="min-h-96">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};