import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get(`/restaurants/${id}`);
        setRestaurant(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get(`/menu?restaurant=${id}`);
        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchRestaurant();
    fetchMenuItems();
  }, [id]);

  if (!restaurant) {
    return <div className="text-center text-white text-lg mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 mt-20">
      <div className="bg-gray-900 shadow-xl text-white rounded-lg overflow-hidden w-full">
        <div className="md:grid md:grid-cols-2 gap-6 flex flex-col">
          {restaurant?.image && (
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-60 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="p-4 space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">{restaurant?.name}</h2>
            <p className="text-gray-400">{restaurant?.address}</p>
            <p className="text-gray-300">
              <span className="font-semibold">📞 Contact:</span> {restaurant?.contact}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">⭐ Rating:</span> {restaurant?.rating}
            </p>
            {restaurant?.cuisines?.length > 0 && (
              <p className="text-gray-300">
                <span className="font-semibold">🍽️ Cuisines:</span> {restaurant.cuisines.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Menu Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="relative border border-gray-700 rounded-lg shadow-md bg-gray-800">
              {/* Image with Hover Effect */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                />
                <button
                  className={`absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm ${
                    !item.isAvailable ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                  disabled={!item.isAvailable}
                >
                  Add
                </button>
              </div>

              {/* Menu Details */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <p className="font-bold text-white mt-2">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
