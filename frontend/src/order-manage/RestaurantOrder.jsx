import { useEffect, useState } from "react";
import { checkUserStatus } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantOrders, getUserOrders } from "../state/orderSlice";

import { useParams } from "react-router-dom";
import { getAllRestaurants } from "../state/restaurantSlice";
import { RestaurantOrderTable } from "./RestaurantOrderTable";

export const RestaurantOrders = () => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const [userRole, setUserRole] = useState("customer");
  const user = useSelector((state) => state.auth?.user?._id);
  const userR = useSelector((state) => state.auth?.user?.role);
  const restaurantOrders =
    useSelector((state) => state.order?.restaurantOrders?.orders) || [];
  const restaurants =
    useSelector((state) => state.restaurant.allRestaurants) || [];
  console.log(restaurantOrders.orders);
  const [loading, setLoading] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const id = useParams();
  // console.log(userOrders);
  const dispatch = useDispatch();
  const fetchRestaurantOrders = async () => {
    setLoading(true);
    console.log(selectedRestaurant);
    try {
      await dispatch(getRestaurantOrders(selectedRestaurant));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setUserRole(userR);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        await dispatch(checkUserStatus());
        await dispatch(getAllRestaurants());
      } catch (error) {
        console.log(error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [dispatch, user]);
  // useEffect(() => {
  //   fetchRestaurantOrders();
  // }, [dispatch, selectedRestaurant]);
  // const handleRestaurantSelection = async (value) => {
  //   // setSelectedRestaurant(e.target.value);
  //   try {
  //     await dispatch(getRestaurantOrders(value));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // navigate(`/orders/${value}`);
  // };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {restaurantOrders && (
            <RestaurantOrderTable orders={restaurantOrders} />
          )}
        </>
      )}
      {isLoggedIn && userR === "restaurantOwner" && (
        <>
          <select
            id="select_restaurant"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
          >
            <option value="">Select a restaurant</option>
            {restaurants.data?.restaurants.map((restaurant) => {
              return (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              );
            })}
          </select>
          <button onClick={fetchRestaurantOrders}>Get Orders</button>
        </>
      )}
    </>
  );
};
