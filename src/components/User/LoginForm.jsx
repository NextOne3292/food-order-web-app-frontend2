import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    onLogin(data.email, data.password);
  };

  return (
    <div className="space-y-4 text-black">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <p className="text-red-300 text-center mb-4">Get your favorite food delivered</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-dark font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 bg-transparent border border-white text-dark placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-black font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 bg-transparent border border-white text-dark placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3 text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Login 
        </button>

        {/* Footer Links */}
        <div className="text-center mt-3">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-red-400 hover:underline">
              Sign up
            </a>
          </p>
          <p className="text-gray-300 text-sm">
            <a href="/forgot-password" className="text-red-400 hover:underline">
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
