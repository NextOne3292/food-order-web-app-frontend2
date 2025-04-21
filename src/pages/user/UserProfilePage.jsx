import { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import UserSidebar from "../../components/User/UserSidebar";
import UserEditForm from "../../components/User/UserEditForm";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/user/profile", {
        withCredentials: true,
      });
      dispatch(updateUser(res.data.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const res = await axiosInstance.put("/user/update", updatedData, {
        withCredentials: true,
      });
      dispatch(updateUser(res.data.data));
  
      // Re-fetch latest data from backend to ensure sync
      fetchUser(); 
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };
  

  useEffect(() => {
    if (!user) fetchUser();
  }, [user]);

  if (!user)
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat pt-20"
      style={{
        backgroundImage: "url('/images/userprofileback2.jpg')", // Make sure this path is correct
      }}
    >
      {/* Sidebar */}
      
      <aside className="w-full lg:w-1/4 bg-white/90 border-r shadow-lg rounded-r-3xl px-2">
        <UserSidebar user={user} />
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4 p-4 sm:p-8 flex justify-center items-start">
        <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-4">
          <UserEditForm user={user} onSave={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
