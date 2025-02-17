import React from "react";

// 🔹 Restaurant Skeleton Loader
export const RestaurantSkeleton = () => {
    return (
        <div className="flex w-64 flex-col gap-4 p-4 border rounded-lg shadow-md animate-pulse">
            <div className="h-36 w-full rounded-lg bg-gray-300"></div>
            <div className="h-4 w-32 bg-gray-300"></div>
            <div className="h-4 w-20 bg-gray-300"></div>
            <div className="h-4 w-full bg-gray-300"></div>
        </div>
    );
};

// 🔹 Menu Skeleton Loader
export const MenuSkeleton = () => {
    return (
        <div className="flex w-52 flex-col gap-4 p-4 border rounded-lg shadow-md animate-pulse">
            <div className="h-28 w-full rounded-lg bg-gray-300"></div>
            <div className="h-4 w-24 bg-gray-300"></div>
            <div className="h-4 w-full bg-gray-300"></div>
        </div>
    );
};

// 🔹 Order Skeleton Loader
export const OrderSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md animate-pulse">
            <div className="h-6 w-40 bg-gray-300"></div>
            <div className="h-4 w-32 bg-gray-300"></div>
            <div className="h-4 w-full bg-gray-300"></div>
        </div>
    );
};

// 🔹 General Card Skeleton Loader (for any list items)
export const CardSkeleton = () => {
    return (
        <div className="flex w-60 flex-col gap-4 p-4 border rounded-lg shadow-md animate-pulse">
            <div className="h-32 w-full rounded-lg bg-gray-300"></div>
            <div className="h-4 w-40 bg-gray-300"></div>
            <div className="h-4 w-full bg-gray-300"></div>
        </div>
    );
};
