import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";

// Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/cart");
    return response.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Add item to cart (only if it doesn't exist)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (menuItem, { rejectWithValue, getState }) => {
    try {
      const { cart } = getState();
      const existingItem = cart.items.find((item) => item.menuItem._id === menuItem._id);

      if (existingItem) {
        return rejectWithValue({ message: "Item already in cart" });
      }

      await axiosInstance.post("/cart", { menuItem: menuItem._id, quantity: 1 });
      const response = await axiosInstance.get("/cart");
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ menuItemId, quantity }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/cart/${menuItemId}`, { quantity });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (menuItemId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cart/${menuItemId}`);
      const response = await axiosInstance.get("/cart");
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Clear the cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete("/cart");
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    items: [],
    totalPrice: 0,
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartId = action.payload._id;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartId = action.payload._id;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        if (action.payload?.message) {
          state.error = action.payload.message;
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartId = action.payload._id;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartId = action.payload._id;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartId = null;
        state.items = [];
        state.totalPrice = 0;
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to clear cart";
      });
  },
});

export default cartSlice.reducer;
