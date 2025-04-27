import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../components/User/LoginForm";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 added useLocation
import { useDispatch } from "react-redux";
import {loginUser}  from "../../redux/UserSlice";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // 👈 get location state

  // ✅ Show toast message passed via navigation (like from SearchResults)
  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.info(location.state.toastMessage);
    }
  }, [location]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/user/login",
        { email, password },
       
      );
  
      toast.success("Login Successful 🎉");
      const user = response.data.data;
      dispatch(loginUser(user));
  
      // ✅ Just navigate after a delay without dismissing toast manually
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


    </div>
  );
};

export default LoginPage;
