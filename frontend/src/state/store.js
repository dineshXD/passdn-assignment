import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import restaurantReducer from "./restaurantSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
