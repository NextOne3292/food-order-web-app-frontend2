import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import RestaurantCard from "../../components/User/RestaurantCard.jsx";

const carouselImages = [
  {
    src: "/images/food1.jpg",
    heading: "Delicious Moments Await!",
    subheading: "Taste the best flavors in town.",
  },
  {
    src: "/images/food2.jpg",
    heading: "Savor Every Bite!",
    subheading: "Handpicked meals made with love.",
  },
  {
    src: "/images/food3.jpg",
    heading: "Experience Culinary Bliss!",
    subheading: "A feast for your senses.",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get("/restaurants");
        setRestaurants(response.data?.data);
      } catch (err) {
        setError("Failed to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!isZoomed) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % carouselImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isZoomed]);

  const nextSlide = () => {
    setIsZoomed(false);
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setIsZoomed(false);
    setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const goToSlide = (index) => {
    setCurrent(index);
    setIsZoomed(false);
  };

  return (
    <div className="w-full bg-gray-100 overflow-hidden">
      {/* Carousel Section */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={carouselImages[current].src}
          alt="Food Banner"
          className={`w-full h-full object-cover transition-transform duration-500 ease-in-out transform ${
            isZoomed ? "scale-110 cursor-zoom-out" : "scale-100 cursor-zoom-in"
          } hover:scale-105`}
          onClick={toggleZoom}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {carouselImages[current].heading}
          </h2>
          <p className="mt-2 text-sm sm:text-lg">
            {carouselImages[current].subheading}
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10 text-sm sm:text-lg"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10 text-sm sm:text-lg"
        >
          ❯
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-white" : "bg-white/40"
              } hover:bg-white transition-all duration-300`}
            ></button>
          ))}
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center gap-2">
          <span>🍽</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            Featured Restaurants
          </h2>
          <span>🍽</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 h-64 rounded-lg shadow-md flex flex-col animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
