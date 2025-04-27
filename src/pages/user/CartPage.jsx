// CartPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "../../redux/cartSlice";
import { fetchAddresses, deleteAddress, setSelectedAddress } from "../../redux/addressSlice";
import CartItem from "../../components/User/CartItem";
import AddressCard from "../../components/User/AddressCard";
import AddressForm from "../../components/User/AddressForm";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

import { FaTrash } from "react-icons/fa"; // Optional: for a trash icon

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);

  const { items, totalPrice, status } = useSelector((state) => state.cart);
  const { list: addressList, selected: selectedAddress, loading: addressLoading, error: addressError } = useSelector((state) => state.address);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const res = await axiosInstance.get("/user/me");
        if (res.status === 200) {
          dispatch(fetchCart());
          dispatch(fetchAddresses());
        }
      } catch (err) {
        console.error("User not authenticated");
        navigate("/login");
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuthAndFetch();
  }, [dispatch, navigate]);

  const handleDeleteAddress = (id) => dispatch(deleteAddress(id));
  const handleSelectAddress = (address) => dispatch(setSelectedAddress(address));

  const handleProceed = () => {
    if (selectedAddress && items.length > 0) {
      navigate("/payment");
    }
  };

  if (!authChecked) return <div className="text-center py-10">Checking authentication...</div>;

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-8">

        <h1 className="text-3xl font-bold text-gray-800 text-center">Your Cart</h1>

        {/* Cart Items */}
        {items.length > 0 ? (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Total Price */}
            <div className="text-right text-xl font-semibold text-gray-700 mt-4">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
            <div>
  <button
    onClick={() => dispatch(clearCart())}
    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all"
  >
    <FaTrash /> Clear Cart
  </button>
</div>
          </>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {/* Address Selection */}
        <div className="pt-10 border-t">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Delivery Address</h2>

          {addressLoading && <p>Loading addresses...</p>}
          {addressError && <p className="text-red-500">{addressError}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addressList.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                onDelete={handleDeleteAddress}
                onSelect={handleSelectAddress}
                selected={selectedAddress?._id === addr._id}
              />
            ))}
          </div>

          {/* Add New Address Form */}
          <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <AddressForm />
          </div>
        </div>

        {/* Proceed to Pay Button */}
        <div className="text-center pt-6">
          {selectedAddress && items.length > 0 ? (
            <button
              onClick={handleProceed}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg text-lg shadow transition-all"
            >
              Proceed to Pay
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg text-lg shadow cursor-not-allowed"
            >
              Select an address to proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
