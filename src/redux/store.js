import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.js";
 // Ensure this path is correct
import cartReducer from "./cartSlice.js";
import addressReducer from "./addressSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});

export default store;

