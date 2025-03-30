import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"; // Ensure this path is correct

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
