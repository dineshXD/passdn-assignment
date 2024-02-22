import { useNavigate, useParams } from "react-router-dom";
import "./restaurantdetail.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById } from "../state/restaurantSlice";
import { addFoodItemToCart, removeFoodItemFromCart } from "../state/cartSlice";
import { addToCart } from "../state/cartActions";
import { checkUserStatus } from "../state/authSlice";
export const RestaurantDetailPage = () => {
  const restaurants = useSelector(
    (state) => state.restaurant?.restaurantDetail
  );
  const user = useSelector((state) => state.auth.user?.role);
  const [userRole, setUserRole] = useState("customer");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const id = useParams();
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        await dispatch(getRestaurantById(id));
      } catch (error) {
        console.log(error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
    // console.lo g(restaurants.data.restaurants.);
  }, [dispatch]);
  useEffect(() => {
    dispatch(checkUserStatus())
      .then(() => {
        setUserRole(user || "customer");
        // setCheckedUserStatus(true);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error checking user status:", error);
      });
  }, [dispatch, user]);

  const handleAddToCart = (item) => {
    // console.log(item);
    dispatch(addFoodItemToCart(item));
  };
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFoodItemFromCart(itemId));
  };
  let cartItems = useSelector((state) => state.cart?.items?.items);
  // console.log(cartItems);

  // console.log(restaurants.restaurant.foodItems);
  return (
    <div className="restaurant-detail">
      <div className="restaurant-title">
        <h1>{restaurants?.restaurant?.name || "McDonald's"}</h1>
      </div>
      <div className="restaurant-heading">
        <h2>{restaurants?.restaurant?.foodCategory || "Burgers, Beverages"}</h2>
        <h2>{restaurants?.restaurant?.address || "Kankaria"}</h2>
      </div>
      <div className="line"></div>
      <h2 className="menu">Menu</h2>
      <div className="line"></div>
      <div className="restaurant-menulist">
        <div className="restaurant-menu">
          <h2>2 McAloo Tikki + 2 Fries (L)</h2>
          <h3>Rs 317.14</h3>
          <p style={{ color: "gray" }}>
            Stay home, stay safe and share a combo- 2 McAloo Tikki Burgers + 2
            Fries (L)
          </p>
          <button className="add-food-cart">Add to cart</button>
        </div>
        {restaurants?.restaurant?.foodItems.map((item) => {
          if (!cartItems) {
            cartItems = [];
          }
          const cartItem = cartItems.find(
            (cartItem) => cartItem._id === item._id
          );
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div className="restaurant-menu" key={item._id}>
              <h2>{item.foodName || "2 McAloo Tikki + 2 Fries (L)"}</h2>
              <h3>Rs {item.foodPrice || 314}</h3>
              <p style={{ color: "gray" }}>
                {item.foodDetails || "  Stay home, stay safe "}
              </p>
              {!cartItem ? (
                <button
                  className="add-food-cart"
                  onClick={() => handleAddToCart(item)}
                  disabled={userRole !== "customer"}
                >
                  {userRole === "customer" ? "Add to cart" : "only for user"}
                </button>
              ) : (
                <div className="add-food-cart-btn">
                  {userRole === "customer" ? (
                    <>
                      <button
                        className="add-food-cart"
                        onClick={() => handleAddToCart(item)}
                        disabled={userRole !== "customer"}
                      >
                        {userRole === "customer" ? "+" : ""}
                      </button>
                      <span className="add-food-cart">
                        {quantity}
                        {/* {cartItems.find((cartItem) => cartItem.id === item.id)
                          ?.quantity || 0} */}
                      </span>
                      <button
                        className="add-food-cart"
                        onClick={() => handleRemoveFromCart(item._id)}
                        disabled={quantity === 0}
                      >
                        -
                      </button>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
