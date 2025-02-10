import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRestaurant(data.data);
        } else {
          console.error("Restaurant not found");
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  if (!restaurant) return <p className="text-center text-red-500">Restaurant not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-4">{restaurant.name}</h2>
      <p className="text-gray-700 mt-2">{restaurant.address}</p>
      <p className="text-gray-700 mt-2">Cuisine: {restaurant.cuisine}</p>
      <div className="flex items-center gap-2 mt-3">
        <FaStar className="text-yellow-500" />
        <span className="text-gray-800 font-semibold">{restaurant.rating || "No rating yet"}</span>
      </div>
      <button className="btn btn-primary mt-4">Order Now</button>
    </div>
  );
};

export default Restaurant;
