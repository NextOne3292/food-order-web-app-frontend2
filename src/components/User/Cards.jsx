import React from "react";
import { useNavigate } from "react-router-dom";

// ====================== Menu Card ==========================
export const MenuCards = ({ menu }) => {
    console.log("MenuCard======", menu);
    const navigate = useNavigate();

    return (
        <div className="card bg-white w-80 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
            <figure className="relative">
                <img src={menu?.imageUrl} alt="menu-item" className="h-48 w-full object-cover" />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                    ₹{menu?.price}
                </div>
            </figure>

            <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-gray-800">{menu?.name} </h2>
                <p className="text-sm text-gray-600">Freshly prepared and delicious!</p>

                <div className="card-actions mt-4 flex justify-between">
                    <button 
                        className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                        onClick={() => navigate(`/menuDetails/${menu?._id}`)}
                    >
                        Order Now
                    </button>
                    <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

// ====================== Cart Card ==========================
export const CartCards = ({ item, handleRemove }) => {
    console.log("Cart Item=====", item);
    return (
        <div className="flex w-full h-32 items-center gap-6 bg-base-200 mb-6 p-4 rounded-lg shadow-md">
            <img src={item?.menuId?.imageUrl} alt="cart-item" className="w-24 h-20 rounded-md object-cover" />

            <div className="flex-1">
                <h2 className="text-lg font-semibold">{item?.menuId?.name} </h2>
                <h3 className="text-gray-600">₹{item?.menuId?.price}</h3>
            </div>

            <button
                className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                onClick={() => handleRemove(item?.menuId?._id)}
            >
                Remove
            </button>
        </div>
    );
};
