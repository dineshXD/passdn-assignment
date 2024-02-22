import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";
import {
  addToCart,
  clearCartItems,
  removeFromCart,
} from "../state/cartActions";
import { addFoodItemToCart, loadCart } from "../state/cartSlice";
import { checkUserStatus } from "../state/authSlice";
import { placeOrder } from "../state/orderSlice";
import { useNavigate } from "react-router-dom";
// import { getCartFromLocalStorage } from "../state/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart?.items?.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  // console.log(totalPrice);
  // const userId = useSelector((state) => state.auth?.user._id);
  const user = useSelector((state) => state.auth.user);
  const restaurant = useSelector((state) => state.restaurant?.restaurantDetail);
  // console.log(restaurant.restaurant._id);
  const [userRole, setUserRole] = useState("customer");
  // console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddItem = (item) => {
    dispatch(addFoodItemToCart(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const handlePlaceOrder = async () => {
    try {
      const data = {
        userId: user._id,
        restaurantId: restaurant?.restaurant._id,
        items: cartItems,
        totalPrice: totalPrice,
      };
      await dispatch(placeOrder(data));
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/", { replace: true });
      dispatch(clearCartItems());
    }
  };
  useEffect(() => {
    dispatch(checkUserStatus())
      .then(() => {
        setUserRole(user?.role || "customer");
        // setCheckedUserStatus(true);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error checking user status:", error);
      });
  }, [dispatch]);
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {!cartItems && <h1>No items in cart</h1>}
        {cartItems?.length === 0 && <h1>No items in cart</h1>}
      </ul>
      {cartItems?.length > 0 &&
        cartItems.map((item) => {
          return (
            <li style={{ listStyle: "none" }} key={item._id}>
              <h2 style={{ margin: "10px" }}>
                {item.foodName} - Rs {item.foodPrice} - Quantity:{" "}
                {item.quantity}{" "}
              </h2>
              <br />
              <button className="add-cart" onClick={() => handleAddItem(item)}>
                +
              </button>
              <button
                className="add-cart"
                onClick={() => handleRemoveItem(item._id)}
              >
                -
              </button>
            </li>
          );
        })}
      <br />
      {cartItems?.length > 0 && <h1>Total Price: Rs {totalPrice}</h1>}
      {cartItems?.length > 0 && (
        <button
          className="add-cart"
          style={{ width: "200px" }}
          onClick={() => dispatch(clearCartItems())}
        >
          Clear Cart
        </button>
      )}

      <br />
      {cartItems?.length > 0 && (
        <>
          <div>
            <h2>email : {user?.email}</h2>
          </div>
          <button
            className="add-cart"
            style={{ width: "200px" }}
            onClick={handlePlaceOrder}
          >
            Place order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
