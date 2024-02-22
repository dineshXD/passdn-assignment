import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus, logout } from "../state/authSlice";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { clearCart } from "../state/cartSlice";
import { getAllRestaurants } from "../state/restaurantSlice";
export const Nav = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user?.role);

  const cartItems = useSelector((state) => state.cart?.items?.items) || [];
  const restaurants =
    useSelector((state) => state.restaurant.allRestaurants) || [];
  const [userRole, setUserRole] = useState("customer");
  const [checkedUserStatus, setCheckedUserStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    dispatch(checkUserStatus())
      .then(() => {
        setUserRole(user || "customer");
        setCheckedUserStatus(true);
        console.log(user);
      })
      .catch((error) => {
        console.error("Error checking user status:", error);
      });
  }, [dispatch, user]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        await dispatch(getAllRestaurants());
      } catch (error) {
        console.log(error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      // Dispatch the logoutUser action
      await dispatch(clearCart());
      await dispatch(logout());
      navigate("/login", { replace: true });
      // Redirect or perform any other action after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  if (!checkedUserStatus) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <nav className="navigation">
        <div className="navigation-logo">
          <ul>
            <li>
              <NavLink to="/">PassDn Kitchen</NavLink>
            </li>
          </ul>
        </div>
        <div className="navigation-options">
          <ul>
            <li>
              {userRole === "customer" ? (
                <NavLink to="/">Search</NavLink>
              ) : (
                <NavLink to="/restaurant/add-restaurant-details">
                  Add Restaurant Details
                </NavLink>
              )}
            </li>
            <li>
              {userRole === "customer" ? (
                <NavLink to="/cart">
                  {cartItems.length === 0
                    ? "Cart"
                    : `Cart (${cartItems.length})`}
                </NavLink>
              ) : (
                <NavLink to="/restaurant/add-food-item">Add Food Item</NavLink>
              )}
            </li>
            <li>
              {isLoggedIn && userRole === "customer" && (
                <NavLink to="orders">Orders</NavLink>
              )}
              {isLoggedIn && userRole === "restaurantOwner" && (
                <NavLink to="orders/restaurant-orders">Orders</NavLink>
              )}
            </li>

            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <li>
                <NavLink to="/login">Sign in</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
