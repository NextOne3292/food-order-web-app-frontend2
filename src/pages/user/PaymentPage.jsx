// src/pages/PaymentPage.jsx
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const stripePromise = loadStripe("pk_test_51RCrQ2QoLf9Eg2nOTJETf8ps0QOVBkGisVxGBUDcwJp5Lf2HTWKB3oU82ix742DAOU0wGaTz5f7M9iNMARILAKvp00mA9wAZeV");

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, cartId } = useSelector((state) => state.cart);

  const { selected: selectedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    const initiateCheckout = async () => {
      if (!selectedAddress || items.length === 0) return navigate("/cart");

      try {
        const payload = {
          items: items.map(item => ({
            menuItem: item.menuItem._id || item.menuItem,
            quantity: item.quantity,
          })),
          deliveryAddress: selectedAddress,
          cartId,
          clientDomain: window.location.origin, 
        };

        console.log("💳 Sending Checkout Request:", payload);

        const res = await axiosInstance.post("/payment/create-checkout-session", payload);

        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      } catch (err) {
        console.error("Payment initiation failed:", err);
        navigate("/cart");
      }
    };

    initiateCheckout();
  }, [items, selectedAddress, cartId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50">
      <div className="max-w-xl w-full space-y-6 text-gray-800">
        <h2 className="text-2xl font-bold text-center">Redirecting to payment gateway...</h2>
        <p className="text-center text-gray-500 animate-pulse">Please wait...</p>
        {selectedAddress && (
          <div className="bg-white border p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
            <p>{selectedAddress.addressLine1}</p>
            {selectedAddress.addressLine2 && <p>{selectedAddress.addressLine2}</p>}
            <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postalCode}</p>
            <p>{selectedAddress.country}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
