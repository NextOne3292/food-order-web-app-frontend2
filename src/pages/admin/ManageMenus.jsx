import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const API_BASE = import.meta.env.VITE_BASE_URL + "/api/menu";
const RESTAURANT_API = import.meta.env.VITE_BASE_URL + "/api/restaurants";

const ManageMenus = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();
  const formRef = useRef(null);

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurants();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(API_BASE);
      setMenuItems(res.data.data);
      setFilteredItems(res.data.data);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(RESTAURANT_API);
      setRestaurants(res.data.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === "image" && data[key][0]) {
          formData.append("image", data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, formData, config);
        toast.success("Menu item updated!");
      } else {
        await axios.post(API_BASE, formData, config);
        toast.success("Menu item added!");
      }

      reset();
      setEditingId(null);
      setCurrentImage(null);
      fetchMenuItems();
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit menu item");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("price", item.price.toString());
    setValue("restaurant", item.restaurant._id || item.restaurant);
    setValue("isAvailable", item.isAvailable ? "true" : "false");
    setCurrentImage(item.image);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      toast("Editing mode enabled");
    }, 100);
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setCurrentImage(null);
    toast("Editing canceled");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
      toast.success("Menu item deleted!");
      fetchMenuItems();
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to delete item");
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    setFilteredItems(
      menuItems.filter((item) =>
        item.name.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto text-gray-800">
      <Toaster position="top-right" />
      <h2 className="text-4xl font-semibold text-center mb-10">🍽️ Manage Menu Items</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="bg-white border shadow-lg rounded-2xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              {...register("name")}
              placeholder="Ex: Veg Biryani"
              className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              placeholder="Ex: 199.00"
              className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant</label>
            <select
              {...register("restaurant")}
              className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <select
              {...register("isAvailable")}
              className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Add some details about the item..."
            className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            {...register("image")}
            type="file"
            className="mt-1 block w-full bg-white text-gray-900 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {currentImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Current Image Preview:</p>
            <img
              src={currentImage}
              alt="preview"
              className="h-24 w-auto mt-1 object-cover rounded shadow"
            />
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
          >
            {editingId ? "Update" : "Add"} Menu Item
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Search & Table */}
      <div className="mt-12">
        <div className="relative mb-4 w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-900"
          />
        </div>

        <div className="overflow-x-auto bg-white border border-gray-200 shadow-md rounded-xl">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Available</th>
                <th className="p-4">Restaurant</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-green-700 font-semibold">₹{item.price}</td>
                  <td className="p-4">{item.isAvailable ? "✅ Yes" : "❌ No"}</td>
                  <td className="p-4">{item.restaurant?.name || item.restaurant}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredItems.length && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No menu items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMenus;
