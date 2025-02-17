import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch"; // Import your custom hook
import axios from "axios";

const EditProfileForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const token = localStorage.getItem("token");
  
  // Use the custom useFetch hook to get user data
  const [user, isLoading, error] = useFetch("/api/user/profile");

  // Set form values when user data is available
  useState(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("mobile", user.mobile);
      setValue("profilePic", user.profilePic);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put("/api/user/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed!");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data!</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input {...register("name")} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email")} className="w-full px-3 py-2 border rounded-lg" disabled />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input {...register("mobile")} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input {...register("profilePic")} className="w-full px-3 py-2 border rounded-lg" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
