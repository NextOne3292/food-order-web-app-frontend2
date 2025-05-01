import { useEffect, useState } from "react";
import { format } from "date-fns";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast"; // ✅ Import toast

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (orderId, itemId) => {
    try {
      const res = await axiosInstance.delete(`/orders/${orderId}/item/${itemId}`);
      if (res.data.success) {
        if (res.data.message.includes("empty order")) {
          setOrders(prev => prev.filter(order => order._id !== orderId));
        } else {
          setOrders(prev =>
            prev.map(order =>
              order._id === orderId
                ? {
                    ...order,
                    items: order.items.filter(item => item._id !== itemId),
                  }
                : order
            )
          );
        }
        toast.success("Item deleted successfully!");
      }
    } catch (err) {
      console.error("Failed to delete item", err);
      toast.error("Failed to delete item");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-600">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-16">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">My Orders</h1>
      <p className="text-gray-500 mb-10 text-lg">
        All your past food orders at one place.
      </p>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg font-medium">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on {format(new Date(order.createdAt), "PPPpp")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Status:{" "}
                    <span className="font-semibold text-blue-700">
                      {order.orderStatus}
                    </span>
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold px-4 py-1 rounded-full ${
                    order.paymentStatus.toLowerCase() === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-2">
                <strong>Delivery Address:</strong>{" "}
                {order.deliveryAddress.addressLine1}, {order.deliveryAddress.city}
              </div>

              <div className="text-sm text-gray-700 mb-4">
                <strong>Total:</strong> ₹{order.totalAmount}
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Ordered Items:</h3>
                <ul className="space-y-4">
                  {order.items.map(item => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.menuItem?.image}
                          alt={item.menuItem?.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                        <div>
                          <p className="text-gray-800 font-medium">
                            {item.menuItem?.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(order._id, item._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
