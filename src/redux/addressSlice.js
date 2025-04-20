import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";

// Fetch addresses
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/address", { withCredentials: true });
      return res.data.addresses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add new address
export const addNewAddress = createAsyncThunk(
  "address/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/address/add", formData, {
        withCredentials: true,
      });
      return res.data.address;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Update address (fixed syntax and URL)
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/address/update/${id}`, formData, {
        withCredentials: true,
      });
      return res.data.address;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/address/delete/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.list.findIndex(addr => addr._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.list = state.list.filter(addr => addr._id !== action.payload);
      });
  },
});

export const { setSelectedAddress } = addressSlice.actions;
export default addressSlice.reducer;
