import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-md p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg text-black">
            <h2 className="text-2xl font-bold text-center">Join FoodOrder!</h2>
            <p className="text-red-400 text-center mb-4">
    Sign up now and order from your <span className="text-yellow-400 font-bold">favorite restaurants!</span>
</p>


            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded text-center mb-3 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-dark font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-transparent border border-white text-dark placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-dark font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-transparent border border-white text-dark placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Mobile Field */}
                <div>
                    <label className="block text-dark font-medium mb-1">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-transparent border border-white text-dark placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                        placeholder="Enter your mobile number"
                        required
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-dark font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-transparent border border-white text-dark placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-3 text-dark"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            {/* Footer Links */}
            <p className="text-center mt-3 text-gray-400 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-red-400 hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
};

export default SignupForm;
