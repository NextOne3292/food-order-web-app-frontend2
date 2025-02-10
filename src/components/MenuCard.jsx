import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const MenuCard = ({ menu }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src={menu.imageUrl} alt={menu.name} className="w-full h-32 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{menu.name}</h3>
      <p className="text-gray-500">{menu.description}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xl font-bold">₹{menu.price}</p>
        <button
          onClick={() => dispatch(addToCart(menu))}
          className="bg-red-500 text-white px-4 py-1 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
