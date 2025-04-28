// frontend/pages/SuccessPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/payment/verify-payment?session_id=${sessionId}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error("Order creation failed:", err);
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchOrder();
    else navigate("/cart");
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-12">
      {loading ? (
        <p className="text-gray-600 text-lg">Verifying payment, please wait...</p>
      ) : order ? (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={() => navigate("/orders")}>View My Orders</button>
        </div>
      ) : (
        <p className="text-red-500">Payment verification failed.</p>
      )}
    </div>
  );
};

export default SuccessPage;
