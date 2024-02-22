import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRestaurantOrdersAPI,
  getUserOrdersAPI,
  placeOrderAPI,
  updateOrderStatusAPI,
} from "../api/orders";
export const placeOrder = createAsyncThunk(
  "orders/place-order",
  async (data, { rejectWithValue }) => {
    try {
      const response = await placeOrderAPI(data);
      // console.log(response);
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserOrders = createAsyncThunk(
  "orders/users",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getUserOrdersAPI(id);
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getRestaurantOrders = createAsyncThunk(
  "orders/restaurant",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRestaurantOrdersAPI(id);
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "orders/update-order-status",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatusAPI(orderId, status);
      console.log(response);
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    status: "",
    orders: [],
    userOrders: [],
    restaurantOrders: [],
    userId: null,
    restaurantId: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })

      .addCase(getRestaurantOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRestaurantOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurantOrders = action.payload;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userOrders = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});
export default orderSlice.reducer;
