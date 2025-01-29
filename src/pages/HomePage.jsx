import React from "react";
import Header from "../components/Header";
import StepsSection from "../components/StepsSection";
import RestaurantList from "../components/RestaurantList";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <StepsSection />
      <RestaurantList />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default HomePage;
