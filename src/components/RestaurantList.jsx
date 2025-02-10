import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRestaurants(data.data);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <p className="text-center text-red-500">No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
