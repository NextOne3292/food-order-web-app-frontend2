import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="block h-full">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
        {/* Restaurant Image with Hover Effect */}
        <div className="overflow-hidden">
          <img
            src={
              restaurant.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s"
            }
            alt={restaurant.name}
            className="w-full h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>

        {/* Restaurant Info */}
        <div className="p-3 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 leading-tight">{restaurant.name}</h2>

          <p className="text-gray-600 text-sm mt-1">
            {Array.isArray(restaurant.cuisines)
              ? restaurant.cuisines.join(", ")
              : JSON.parse(restaurant.cuisines).join(", ")}
          </p>

          <div className="flex items-center text-gray-700 text-sm mt-1">
            {restaurant.rating} <FaStar className="text-yellow-500 ml-1" />
          </div>

          <p className="text-gray-500 text-xs mt-1">{restaurant.address}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
