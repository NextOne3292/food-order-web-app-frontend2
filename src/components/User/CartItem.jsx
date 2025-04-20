import { useDispatch } from "react-redux";
import { updateCartItem, removeFromCart } from "../../redux/cartSlice";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    if (quantity < 5) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(updateCartItem({ menuItemId: item.menuItem._id, quantity: newQuantity }));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateCartItem({ menuItemId: item.menuItem._id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(item.menuItem._id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.menuItem._id));
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Left: Image + Info */}
      <div className="flex items-center gap-4">
        <img
          src={item.menuItem?.image || "/placeholder.jpg"}
          alt={item.menuItem?.name || "Food Item"}
          className="w-16 h-16 object-cover rounded-lg shadow-sm"
        />
        <div>
          <h2 className="text-lg font-semibold">{item.menuItem?.name}</h2>
          <p className="text-gray-500">₹{item.price}</p>

          {/* Quantity Controls */}
          <div className="flex items-center mt-2">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400 disabled:opacity-50"
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-4 py-1 border text-sm">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400 disabled:opacity-50"
              disabled={quantity === 5}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right: Trash Icon */}
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 transition p-2"
        title="Remove from Cart"
      >
        <FaTrash size={18} />
      </button>
    </div>
  );
};

export default CartItem;
