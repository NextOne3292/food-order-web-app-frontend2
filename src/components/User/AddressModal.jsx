// components/AddressModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../redux/addressSlice";
import { toast } from "react-toastify";

const AddressModal = ({ show, onClose, address }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (address) setFormData({ ...address });
  }, [address]);

  useEffect(() => {
    if (!show) {
      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    }
  }, [show]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAddress({ id: address._id, formData }));
    toast.success("Address updated successfully");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 mt-10 p-4 text-gray-800"> DeliveryAddress</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-400"
            />
          ))}

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;

