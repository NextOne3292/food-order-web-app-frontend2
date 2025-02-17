import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import toast from "react-toastify";
import { motion } from "framer-motion";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";

export const Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = {
        role: "user",
        loginAPI: "/user/login",
        profileRoute: "/user/profile",
        signupRoute: "/signup",
    };

    if (role === "admin") {
        user.role = "admin";
        user.loginAPI = "/admin/login";
        user.profileRoute = "/admin/dashboard";
        user.signupRoute = "/admin/signup";
    }

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(user.loginAPI, data);
            dispatch(saveUser(response?.data?.data));
            toast.success("Login successful!");
            navigate(user.profileRoute);
        } catch (error) {
            dispatch(clearUser());
            toast.error("Login Failed. Please check your credentials.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"
            >
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Login as {user.role}</h1>
                <p className="text-gray-600 text-center mb-6">Access your account and manage orders seamlessly.</p>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            {...register("email")} 
                            className="pl-10 w-full input input-bordered rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            {...register("password")} 
                            className="pl-10 w-full input input-bordered rounded-lg" 
                            required 
                        />
                    </div>
                    <div className="flex justify-between text-sm">
                        <Link to="#" className="text-blue-500 hover:underline">Forgot password?</Link>
                        <Link to={user.signupRoute} className="text-blue-500 hover:underline">New User? Sign Up</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                </form>
            </motion.div>
        </div>
    );
};