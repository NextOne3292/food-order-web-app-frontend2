import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage initially
const initialUser = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
  name: "user",
  initialState: { user: initialUser },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store in localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
