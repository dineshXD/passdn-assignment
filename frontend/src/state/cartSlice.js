import { createSlice } from "@reduxjs/toolkit";
export const getCartFromLocalStorage = () => {
  // const cartData = localStorage.getItem("cart");
  // return cartData ? JSON.parse(cartData) : [];
  // const items = JSON.parse(localStorage.getItem("cartItems")) || [];
  // const totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
  // return { items, totalAmount };
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return { totalAmount: 0, items: [] };
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return { totalAmount: 0, items: [] };
  }
};

// Function to update cart data in local storage
const updateCartInLocalStorage = (state) => {
  localStorage.setItem("cartItems", JSON.stringify(state.items));
  localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalAmount: 0,
    // items: [],
    items: getCartFromLocalStorage(),
  },
  reducers: {
    addFoodItemToCart(state, action) {
      // console.log(action.payload);
      // Check if item is already in the cart
      // / Check if item is already in the cart
      console.log(state.items);
      const existingCartItemIndex = state.items?.items?.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingCartItemIndex >= 0) {
        // If item exists, update the quantity and total price
        state.items.items[existingCartItemIndex].quantity += 1;
        state.items.items[existingCartItemIndex].totalPrice =
          state.items.items[existingCartItemIndex].quantity *
          state.items.items[existingCartItemIndex].foodPrice;
        state.totalAmount += state.items.items[existingCartItemIndex].foodPrice;
      } else {
        // If item does not exist, add new item to cart with quantity 1
        const newItem = {
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.foodPrice,
        };
        state.items.items.push(newItem);
        state.totalAmount += newItem.totalPrice;
      }

      // console.log(state);
      updateCartInLocalStorage(state);
      // const newFoodItem = { ...action.payload };
      // const existingItemIndex = state.items.findIndex(
      //   (item) => item._id === newFoodItem._id
      // );
      // if (existingItemIndex !== -1) {
      //   state.items[existingItemIndex].quantity += 1;
      // } else {
      //   newFoodItem.quantity = 1;
      //   state.items.push(newFoodItem);
      // }
      // state.totalAmount = calculateTotalAmount(state.items);
      // updateCartInLocalStorage([
      //   {
      //     ...state.items,
      //     totalAmount: state.totalAmount,
      //   },
      // ]);
    },
    removeFoodItemFromCart(state, action) {
      const itemToRemoveIndex = state.items.items.findIndex(
        (item) => item._id === action.payload
      );
      const itemToRemove = state.items.items[itemToRemoveIndex];

      if (itemToRemove.quantity > 1) {
        // If item quantity is more than 1, decrease the quantity and total price
        itemToRemove.quantity -= 1;
        itemToRemove.totalPrice =
          itemToRemove.quantity * itemToRemove.foodPrice;
        state.totalAmount -= itemToRemove.foodPrice;
      } else {
        // If item quantity is 1, remove the item from the cart
        state.items.items.splice(itemToRemoveIndex, 1);
        state.totalAmount -= itemToRemove.totalPrice;
      }
      updateCartInLocalStorage(state);
      // console.log(action.payload);
      // // Find the item to be removed
      // const itemToRemoveIndex = state.items.findIndex(
      //   (item) => item._id === action.payload
      // );
      // const itemToRemove = state.items[itemToRemoveIndex];

      // // Remove the item from the cart
      // state.items.splice(itemToRemoveIndex, 1);
      // state.totalAmount -= itemToRemove.totalPrice;
    },
    clearCart(state) {
      // (state.items = []), (state.items.totalAmount = 0);
      state.items = [];
      state.totalAmount = 0;
      updateCartInLocalStorage({ items: [], totalAmount: 0 }); // Update local storage
    },
  },
});
const calculateTotalAmount = (items) => {
  let totalAmount = 0;

  for (const foodItem of items) {
    totalAmount += foodItem.foodPrice * foodItem.quantity;
  }
  return totalAmount;
  //   return items.reduce(
  //     (total, item) => total + item.foodPrice * item.quantity,
  //     0
  //   );
};
const calculateRemoveAmount = (items) => {
  let removeAmount = 0;
  for (const foodItem of items) {
    removeAmount += foodItem.foodPrice * foodItem.quantity;
  }
  return removeAmount;
};

export const {
  loadCart,
  addFoodItemToCart,
  removeFoodItemFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
