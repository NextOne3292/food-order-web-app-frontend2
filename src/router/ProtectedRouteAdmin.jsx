import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
    const { isUserAuth, userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuth || userData?.role !== "admin") {
            navigate("/login"); // Redirect to login if not authenticated or not an admin
        }
    }, [isUserAuth, userData, navigate]);

    return isUserAuth && userData?.role === "admin" ? <Outlet /> : null;
};
