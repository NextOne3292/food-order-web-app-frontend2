import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast }  from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone } from "lucide-react";

export const Signup = ({ role = "user" }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const apiEndpoint = role === "admin" ? "/admin/signup" : "/user/signup";
            const response = await axiosInstance.post(apiEndpoint, data);
            toast.success("Signup successful!");
            navigate(role === "admin" ? "/admin/profile" : "/user/profile");
        } catch (error) {
            toast.error("Signup failed! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <motion.div 
                className="card bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-center text-gray-800">Sign Up as {role}</h1>
                <p className="text-center text-gray-500 mb-6">Create an account to continue</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            {...register("name", { required: "Username is required" })} 
                            className="input input-bordered w-full pl-10"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })} 
                            className="input input-bordered w-full pl-10"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Mobile Number" 
                            {...register("mobile", { required: "Mobile number is required" })} 
                            className="input input-bordered w-full pl-10"
                        />
                        {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum 8 characters" } })} 
                            className="input input-bordered w-full pl-10"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                </form>
            </motion.div>
        </div>
    );
};
