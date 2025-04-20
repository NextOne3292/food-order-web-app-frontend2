import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center px-6 py-12" 
      style={{ backgroundImage: "url('/images/about-bg.jpg')" }}>
      
      <div className="w-full max-w-6xl bg-white bg-opacity-80 shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side - Image */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <img 
            src="/images/fooddeliveryboy.jpg" 
            alt="Food Delivery" 
            className="w-72 h-72 object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3 hover:shadow-xl"
          />
          <p className="mt-4 text-gray-700 text-center font-semibold">
            Bringing your favorite food to your doorstep in just a few taps! 🍽️
          </p>
        </div> {/* ✅ Properly closed div */}

        {/* Center Content - About Us */}
        <div className="col-span-1 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-6">
            About FoodOrder!
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Craving something delicious? <span className="text-red-500 font-semibold">FoodOrder</span> 
            brings the best restaurants near you, straight to your doorstep! From local street food 
            to gourmet dishes, we’ve got everything to satisfy your hunger in just a few taps.
          </p>

          <h2 className="text-2xl font-semibold text-red-500 mt-6">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-2 text-left">
            <li>🚀 <strong>Super Fast Delivery</strong> – Your food arrives hot & fresh, right on time.</li>
            <li>🍽 <strong>Endless Choices</strong> – From budget bites to premium meals, we’ve got it all.</li>
            <li>🔐 <strong>Secure Payments</strong> – Multiple payment options, including UPI, wallets, & COD.</li>
            <li>💰 <strong>Exciting Offers</strong> – Exclusive discounts, cashback, and loyalty rewards.</li>
          </ul>
        </div>

        {/* Right Side - Testimonial */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <blockquote className="italic text-gray-700 text-lg text-center">
            "FoodOrder has changed the way I enjoy food! Fast, reliable, and always fresh."
          </blockquote>
          <p className="mt-4 font-bold text-red-500">- Happy Customer</p>
        </div>

      </div> {/* ✅ Ensuring the container properly wraps everything */}
    </div>
  );
};

export default AboutPage;
