import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
export const Restaurant = () => {
  const [restaurants, isLoading, error] = useFetch("/restaurants");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading restaurants</p>;

  return (
      <div className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-center mb-10">Restaurants</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant) => (
                  <div key={restaurant._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <img src={restaurant.image} alt={restaurant.name} className="w-full h-60 object-cover" />
                      <div className="p-6">
                          <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
                          <p className="text-gray-600">{restaurant.cuisine}</p>
                          <p className="text-gray-800 font-medium">{restaurant.address}</p>
                          <p className="text-gray-500">Contact: {restaurant.contact}</p>
                          <Link to={`/restaurants/${restaurant._id}`} className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                              View Details
                          </Link>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};
