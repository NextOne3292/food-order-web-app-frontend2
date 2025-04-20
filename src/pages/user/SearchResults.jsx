import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const dispatch = useDispatch();

  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!searchQuery) return;
        const { data } = await axiosInstance.get(`/search?query=${searchQuery}`);
        setRestaurants(data.restaurants || []);
        setMenus(data.menus || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const handleAddToCart = (menuItem) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login", {
        state: {
          toastMessage: "Please log in to add items to your cart",
        },
      });
      return;
    }

    if (!menuItem.isAvailable) {
      toast.warning(`${menuItem.name} is currently not available.`);
      return;
    }

    setAddingId(menuItem._id);

    dispatch(addToCart(menuItem))
      .unwrap()
      .then(() => {
        toast.success(`${menuItem.name} added to cart!`);
      })
      .catch((error) => {
        if (error?.message === "Item already in cart") {
          toast.info(`${menuItem.name} is already in your cart`);
        } else {
          toast.error("Failed to add item to cart.");
        }
      })
      .finally(() => {
        setAddingId(null);
      });
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {loading ? (
        <p className="text-gray-500">Loading results...</p>
      ) : restaurants.length === 0 && menus.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 p-4 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
            alt="No Food Results"
            className="w-40 h-40 mb-4 opacity-80"
          />
          <h2 className="text-xl font-semibold text-gray-600">No matching food found</h2>
          <p className="text-sm text-gray-500">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {restaurants.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Restaurants</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant._id}
                    className="border rounded-lg p-4 shadow bg-gray-800 text-white cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-40 object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
                    />
                    <h2 className="text-lg font-semibold mt-2">{restaurant.name}</h2>
                    <p className="text-gray-400">{restaurant.cuisines?.join(", ")}</p>
                    <p className="text-gray-300">{restaurant.address}</p>
                    <p className="text-yellow-500 font-semibold">⭐ {restaurant.rating}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {menus.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Menu Items</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.map((menu) => (
                  <div
                    key={menu._id}
                    className="border rounded-lg p-4 shadow bg-gray-800 text-white relative hover:shadow-lg transition-all"
                  >
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-40 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105"
                    />
                    <button
                      onClick={() => handleAddToCart(menu)}
                      disabled={addingId === menu._id}
                      className={`absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm ${
                        addingId === menu._id
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-600"
                      }`}
                    >
                      {addingId === menu._id ? "Adding..." : "Add"}
                    </button>
                    <h2 className="text-lg font-semibold mt-2">{menu.name}</h2>
                    <p className="text-gray-300">{menu.description}</p>
                    <p className="font-bold mt-2">₹{menu.price}</p>
                    <p className="text-gray-400 text-xs">{menu.restaurant?.name}</p>
                    {!menu.isAvailable && (
                      <p className="text-red-400 text-sm font-semibold mt-1">Not Available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
