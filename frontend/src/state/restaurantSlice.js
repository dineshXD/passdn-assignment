import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFoodItemDetailsAPI,
  addRestaurantDetailsAPI,
  getAllRestaurantsAPI,
  getRestaurntByIdAPI,
} from "../api/restaurant";

export const addRestaurantDetails = createAsyncThunk(
  "restaurant/add-details",
  async (details, { rejectWithValue }) => {
    try {
      const response = await addRestaurantDetailsAPI(details);
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addFoodItemDetails = createAsyncThunk(
  "restaurant/add-food-item",
  async (details, { rejectWithValue }) => {
    try {
      const response = await addFoodItemDetailsAPI(details);
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
export const getAllRestaurants = createAsyncThunk(
  "restaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRestaurantsAPI();
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getRestaurantById = createAsyncThunk(
  "restaurant/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRestaurntByIdAPI(id);
      if (response?.response?.data.status === "failed") {
        return response.response.data.message;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurantDetail: null,
    allRestaurants: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRestaurantDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurantDetail = action.payload;
      })
      .addCase(addFoodItemDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurantDetail = action.payload;
      })
      .addCase(getAllRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allRestaurants = action.payload;
      })
      .addCase(getRestaurantById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurantDetail = action.payload;
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

export default restaurantSlice.reducer;
