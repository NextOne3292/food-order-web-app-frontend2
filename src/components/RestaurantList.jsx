import React from "react";

const RestaurantList = () => {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-2xl font-bold mb-8">Featured Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src="https://via.placeholder.com/300"
            alt="Restaurant"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-xl font-semibold">Restaurant Name</h3>
          <p className="text-gray-600 mt-2">Cuisine Type</p>
        </div>
        {/* Add more cards here */}
      </div>
    </section>
  );
};

export default RestaurantList;
