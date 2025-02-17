import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const MenuDetails = () => {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axiosInstance.get(`/menu/${id}`); // Fetch menu item details
                setMenuItem(response.data);
            } catch (error) {
                console.error("Error fetching menu details:", error);
            }
        };
        fetchMenuItem();
    }, [id]);

    if (!menuItem) return <p className="text-center py-10">Loading menu details...</p>;

    return (
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-6">
            <img 
                src={menuItem.imageUrl || "https://example.com/food-placeholder-image.png"} 
                alt={menuItem.name} 
                className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md" 
            />
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold">{menuItem.name}</h1>
                <p className="text-gray-600 mt-3">{menuItem.description}</p>
                <p className="text-red-500 text-2xl font-semibold mt-3">${menuItem.price}</p>
                <p className="text-gray-500 mt-2">Restaurant: <span className="font-semibold">{menuItem.restaurant?.name}</span></p>
                {!menuItem.isAvailable ? (
                    <p className="text-red-600 font-bold mt-4">Currently Unavailable</p>
                ) : (
                    <button className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};
