// AddressForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewAddress } from "../../redux/addressSlice";
import { toast } from "react-toastify";
import { MapPin } from "lucide-react"; // Optional icon for style

const AddressForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAddress(formData));
    toast.success("New address added successfully");
    setFormData({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-green-500" />
        <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
