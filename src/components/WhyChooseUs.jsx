import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Icon"
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Fast Delivery</h3>
          <p className="text-gray-600 mt-2">Get your food delivered quickly</p>
        </div>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Icon"
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Best Prices</h3>
          <p className="text-gray-600 mt-2">Affordable meals every time</p>
        </div>
        <div className="text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Icon"
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Wide Selection</h3>
          <p className="text-gray-600 mt-2">Choose from a variety of cuisines</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
