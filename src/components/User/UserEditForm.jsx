// components/UserEditForm.jsx
// src/components/user/UserEditForm.jsx

import { useState } from "react";
import { toast } from "react-toastify";

import { Pencil, Save } from "lucide-react";

const UserEditForm = ({ user, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => setEditMode((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error("Update failed. Try again!");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-xl w-full transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Edit Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            disabled={!editMode}
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              editMode ? "bg-white" : "bg-gray-100"
            } transition focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            disabled={!editMode}
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              editMode ? "bg-white" : "bg-gray-100"
            } transition focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            disabled={!editMode}
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${
              editMode ? "bg-white" : "bg-gray-100"
            } transition focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="Mobile number"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={toggleEdit}
            className="text-blue-600 hover:underline flex items-center gap-2 font-medium"
          >
            <Pencil className="w-4 h-4" />
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>

          {editMode && (
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
