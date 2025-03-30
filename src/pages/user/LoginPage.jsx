import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../components/user/LoginForm";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/UserSlice"; // Import Redux action

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get Redux dispatch

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", { email, password });

      toast.success("Login Successful 🎉");

      dispatch(loginUser(response.data.data)); // ✅ Update Redux state immediately

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-black">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backaground-image.jpg')" }}
      ></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
        <LoginForm onLogin={handleLogin} loading={loading} />
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default LoginPage;
