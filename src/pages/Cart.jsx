import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CartCards } from "../../components/user/Cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);

    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartDetails?.items },
            });

            const result = stripe.redirectToCheckout({
                sessionId: session.data.sessionId,
            });
        } catch (error) {
            console.log(error);
            toast.error("Payment failed. Try again.");
        }
    };

    const handleRemoveCartItem = async (menuId) => {
        try {
            await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-from-cart",
                data: { menuId },
            });
            toast.success("Item removed from cart");
            setRefreshState((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to remove item");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-7/12 bg-white shadow-lg p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Items in Cart</h2>
                    {cartDetails?.items?.length > 0 ? (
                        cartDetails?.items?.map((item) => (
                            <CartCards key={item?._id} item={item} handleRemove={handleRemoveCartItem} />
                        ))
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}
                </div>
                <div className="w-full lg:w-5/12 bg-white shadow-lg p-6 rounded-xl flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        {cartDetails?.items?.map((item) => (
                            <div key={item?._id} className="flex justify-between border-b pb-2">
                                <p className="font-medium">{item?.menuId?.name}</p>
                                <p className="text-gray-700">₹{item?.menuId?.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between font-semibold text-lg">
                        <p>Total Price:</p>
                        <p>₹{cartDetails?.totalPrice}</p>
                    </div>
                    <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all" onClick={makePayment}>
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};
