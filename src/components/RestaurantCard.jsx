import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="card w-72 bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-all">
      <Link to={`/restaurants/${restaurant._id}`}>
        <figure>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-40 object-cover"
          />
        </figure>
      </Link>
      <div className="p-4">
        <h2 className="font-bold text-lg">{restaurant.name}</h2>
        <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
        <div className="flex items-center gap-2 mt-2">
          <FaStar className="text-yellow-500" />
          <span className="text-gray-800 font-semibold">{restaurant.rating || "No rating"}</span>
        </div>
        <Link to={`/restaurants/${restaurant._id}`}>
          <button className="btn btn-primary mt-3 w-full">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
