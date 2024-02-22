import {
  addFoodItemToCart,
  clearCart,
  removeFoodItemFromCart,
} from "./cartSlice";

export const addToCart = (item) => (dispatch) => {
  dispatch(addFoodItemToCart(item));
};
export const removeFromCart = (itemId) => (dispatch) => {
  dispatch(removeFoodItemFromCart(itemId));
};
export const clearCartItems = () => (dispatch) => {
  dispatch(clearCart());
};
