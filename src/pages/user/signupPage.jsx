import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../config/axiosInstance";
import SignupForm from "../../components/user/signupForm";

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const notifySuccess = (message) => toast.success(message, toastOptions);
    const notifyError = (message) => toast.error(message, toastOptions);

    const handleSignup = async (formData) => {
        setLoading(true);
        setError("");

        try {
            const response = await axiosInstance.post("/user/signup", formData, {
                headers: { "Content-Type": "application/json" }, // updated header
                withCredentials: true,
            });

            notifySuccess(response.data.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Signup failed!";
            setError(errorMsg);
            notifyError(errorMsg);
        }

        setLoading(false);
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-gray-100"
            style={{
                backgroundImage: `url('/images/backaground-image.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <SignupForm onSubmit={handleSignup} loading={loading} error={error} />
        </div>
    );
};

export default Signup;
