import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const SkeletonCard = () => (
  <div className="border rounded-lg p-4 shadow animate-pulse bg-white">
    <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!searchQuery) return;
        const { data } = await axiosInstance.get(`/search?query=${searchQuery}`);
        setRestaurants(data.restaurants);
        setMenus(data.menus);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  const addToCart = (menuItem) => {
    setCart([...cart, menuItem]);
    alert(`${menuItem.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-6 py-10">
     

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : restaurants.length === 0 && menus.length === 0 ? (
        <p className="text-gray-500 mt-4">No results found.</p>
      ) : (
        <div className="space-y-8 mt-6">
          {/* Restaurants Section */}
          {restaurants.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Link
                    key={restaurant._id}
                    to={`/restaurant/${restaurant._id}`}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative group overflow-hidden"
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-40 object-cover rounded-md transform group-hover:scale-105 transition duration-300"
                    />
                    
                    <h2 className="text-xl font-semibold mt-2">{restaurant.name}</h2>
                    <p className="text-gray-600">
  {restaurant.cuisines?.length ? restaurant.cuisines.join(", ") : "No cuisines available"}
</p>

                    <p className="text-gray-600">{restaurant.address}</p>
                    <p className="text-yellow-500 font-semibold">⭐ {restaurant.rating}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Menu Items Section */}
          {menus.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.map((menu) => (
                  <div
                    key={menu._id}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white relative group overflow-hidden"
                  >
                    <Link to={`/menu/${menu._id}`}>
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-full h-40 object-cover rounded-t-lg transform group-hover:scale-105 transition duration-300"
                      />
                      <button
                      onClick={() => addToCart(menu)}
                      className={`absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm ${
                        !menu.isAvailable ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                      }`}
                      disabled={!menu.isAvailable}
                    
                    >
                      Add
                    </button>
                      <h2 className="text-xl font-semibold mt-2">{menu.name}</h2>
                      <p className="text-gray-500">Restaurant: {menu.restaurant?.name}</p>
                      <p className="font-bold text-black mt-2">₹ {menu.price}</p>

                      <p className="text-gray-500 text-xs mt-1">{menu.restaurant?.address}</p>
                      <p className="text-yellow-500 font-semibold">⭐ {menu.restaurant?.rating}</p>
                      <p className="text-gray-600">{menu.description}</p>
                    </Link>
                   
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
