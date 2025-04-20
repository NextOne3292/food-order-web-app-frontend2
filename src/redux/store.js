import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Ensure this path is correct
import cartReducer from "./cartSlice";
import addressReducer from "./addressSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});

export default store;

