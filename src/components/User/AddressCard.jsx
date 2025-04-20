import React, { useState } from "react";
import AddressModal from "./AddressModal";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

const AddressCard = ({ address, onDelete, onSelect, selected }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this address?");
    if (confirm) {
      onDelete(address._id);
      toast.success("Address deleted successfully");
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border cursor-pointer ${
        selected ? "border-green-500 ring-2 ring-green-300" : "border-gray-200"
      }`}
      onClick={() => onSelect(address)}
    >
      <div>
        <p className="text-lg font-semibold text-gray-900">{address.addressLine1}</p>
        <p className="text-sm text-gray-600">{address.addressLine2}</p>
        <p className="text-sm text-gray-600">
          {address.city}, {address.state} - {address.postalCode}
        </p>
        <p className="text-sm text-gray-600">{address.country}</p>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      <AddressModal show={showModal} onClose={() => setShowModal(false)} address={address} />
    </div>
  );
};

export default AddressCard;
