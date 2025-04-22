import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Search } from "lucide-react";

const API_BASE = import.meta.env.VITE_BASE_URL + "/api/restaurants";


const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const restaurantRefs = useRef([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const formRef = useRef(null);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(API_BASE);
      setRestaurants(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };
  

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered(restaurants);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filteredData = restaurants.filter((rest) => {
        return (
          rest.name.toLowerCase().includes(lowerSearch) ||
          rest.cuisines?.join(", ").toLowerCase().includes(lowerSearch)
        );
      });
      setFiltered(filteredData);
    }
  }, [searchTerm, restaurants]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === "image" && data[key][0]) {
          formData.append(key, data[key][0]);
        } else if (key === "menu") {
          formData.append("menu", JSON.stringify(JSON.parse(data[key])));
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
        toast.success("Restaurant updated successfully!");
      } else {
        await axios.post(API_BASE, formData, config);
        toast.success("Restaurant added successfully!");
      }

      reset();
      setEditingId(null);
      fetchRestaurants();
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (restaurant) => {
    setEditingId(restaurant._id);
    for (let key in restaurant) {
      if (key === "menu") {
        setValue("menu", JSON.stringify(restaurant[key]));
      } else if (key !== "image") {
        setValue(key, restaurant[key]);
      }
    }

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      toast("Editing mode enabled");
    }, 100);
  };

  const handleCancelEdit = () => {
    reset();
    setEditingId(null);
    toast("Edit cancelled");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
      toast.success("Restaurant deleted!");
      fetchRestaurants();
    } catch (error) {
      toast.error("Failed to delete");
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        🍽️ Manage Restaurants
      </h1>

      {/* Search Input with Icon */}
      <div className="relative mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by restaurant or cuisine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input bg-white text-black input-bordered w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      </div>

      {/* Restaurant Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="bg-white p-6 rounded-xl shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("name")} placeholder="Restaurant Name" className="input bg-white text-black input-bordered w-full" />
          <input {...register("address")} placeholder="Address" className="input bg-white text-black input-bordered w-full" />
          <input {...register("contact")} placeholder="Contact" className="input bg-white text-black input-bordered w-full" />
          <input {...register("cuisines")} placeholder="Cuisines (comma-separated)" className="input bg-white text-black input-bordered w-full" />
          <input type="number" {...register("rating")} placeholder="Rating (0-5)" className="input bg-white text-black input-bordered w-full" />
          <input type="file" {...register("image")} className="file-input file-input-bordered bg-white w-full" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition w-full md:w-auto"
          >
            {editingId ? "Update Restaurant" : "Add Restaurant"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition w-full md:w-auto"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filtered.map((rest, index) => (
          <div
            key={rest._id}
            ref={(el) => (restaurantRefs.current[index] = el)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={rest.image}
              alt={rest.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{rest.name}</h2>
              <p className="text-gray-500">{rest.address}</p>
              <p className="text-gray-500">📞 {rest.contact}</p>
              <p className="text-gray-500">🍽️ {rest.cuisines?.join(", ")}</p>
              <p className="text-yellow-500 font-medium">⭐ {rest.rating}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(rest)}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rest._id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRestaurants;
