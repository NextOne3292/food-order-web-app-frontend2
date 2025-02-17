import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
export const RestaurantDetails = ({ match }) => {
    const { id } = match.params;
    const [restaurant, isLoading, error] = useFetch(`/restaurants/${id}`);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading restaurant details</p>;

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-80 object-cover" />
                <div className="p-6">
                    <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                    <p className="text-gray-600 text-lg">{restaurant.cuisine}</p>
                    <p className="text-gray-800 font-medium">{restaurant.address}</p>
                    <p className="text-gray-500">Contact: {restaurant.contact}</p>
                    <h2 className="text-2xl font-semibold mt-6">Menu</h2>
                    <ul className="mt-2">
                        {restaurant.menu.map((item) => (
                            <li key={item._id} className="text-gray-700">{item.name} - ${item.price}</li>
                        ))}
                    </ul>
                    <Link to="/restaurants" className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                        Back to Restaurants
                    </Link>
                </div>
            </div>
        </div>
    );
};