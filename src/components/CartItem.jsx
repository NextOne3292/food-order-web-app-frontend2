import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-700">₹{item.price}</p>
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
