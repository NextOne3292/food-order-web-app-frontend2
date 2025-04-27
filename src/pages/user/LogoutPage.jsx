import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  {logoutUser}  from "../../redux/UserSlice";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Keep using `.user.user`

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/user/logout");

      dispatch(logoutUser()); // Clears Redux state
      toast.success("Logout Successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed ❌");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">🍽️ FoodOrder</Link>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-red-400">Login</Link>
            <Link to="/signup" className="hover:text-red-400">Signup</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default LogoutPage;
