import React from "react";

const StepsSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-8">How Does it Work?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Step 1</h3>
          <p className="text-gray-600 mt-2">Browse your favorite restaurants</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Step 2</h3>
          <p className="text-gray-600 mt-2">Add items to your cart</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Step 3</h3>
          <p className="text-gray-600 mt-2">Checkout and enjoy your meal</p>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
