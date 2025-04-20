import { useEffect, useState } from "react";
import { format } from "date-fns";
import { axiosInstance } from "../../config/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "lucide-react"; // ✅ Lucide icon

const statusOptions = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders/all", {
        withCredentials: true,
      });
      setOrders(res.data.orders);
      setFilteredOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch admin orders", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      await axiosInstance.put(
        `/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success("Order status updated successfully");
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status", err);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = orders.filter(
      (order) =>
        order.user?.name?.toLowerCase().includes(value) ||
        order.user?.email?.toLowerCase().includes(value)
    );
    setFilteredOrders(filtered);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-medium text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-20">
      <ToastContainer />
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Manage Orders
        </h1>
        <p className="text-gray-500 text-base mt-2">
          View and update customer orders efficiently.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="relative max-w-md mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by customer name or email..."
          className="w-full pl-10 bg-white pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-medium">
          No orders found.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Placed on {format(new Date(order.createdAt), "PPPpp")}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Customer:</span>{" "}
                      {order.user?.name} ({order.user?.email})
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      order.paymentStatus.toLowerCase() === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  <strong>Delivery:</strong> {order.deliveryAddress.addressLine1},{" "}
                  {order.deliveryAddress.city}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <strong>Total:</strong> ₹{order.totalAmount}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Status
                  </label>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={updating}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Ordered Items
                  </h3>
                  <ul className="space-y-3">
                    {order.items.map((item) => (
                      <li
                        key={item.menuItem?._id || item._id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.menuItem?.image}
                          alt={item.menuItem?.name}
                          className="w-14 h-14 rounded-md object-cover border"
                        />
                        <div>
                          <p className="text-gray-800 font-medium text-sm">
                            {item.menuItem?.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
