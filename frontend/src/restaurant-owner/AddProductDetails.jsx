import React, { useEffect, useState } from "react";
import axios from "axios";
import "./restaurant.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFoodItemDetails,
  getAllRestaurants,
} from "../state/restaurantSlice";

export const AddProductDetails = () => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDetails, setFoodDetails] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const errors = useSelector((state) => state.restaurant.error);
  // const allRestaurants = useSelector(
  //   (state) => state.restaurants?.allRestaurants
  // );
  const restaurants = useSelector((state) => state.restaurant.allRestaurants);
  // const [listRestaurants, setListRestaurants] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addFoodItemDetails({
          foodName,
          foodPrice,
          foodDetails,
          restaurantId: selectedRestaurant,
        })
      );
      if (errors) {
        console.log(errors);
        setErrorMessage(errorMessage);
      } else {
        navigate("/", { replace: true });
        // navigate("../add-food-item", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(errorMessage);
    }
  };
  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
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
  return (
    <>
      <main className="add-product">
        <div className="restaurant-content">
          <h2>Add New Food Item</h2>
          {/* {errors.signupError && (
          <p className="authError">
            {createUser.error?.response?.data?.message || errors.signupError}
          </p>
        )} */}
          <div className="restaurant-form details-form">
            <form onSubmit={handleAddProduct}>
              <div className="form-field">
                <label htmlFor="fooditem_name">Food item name</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. Pizza"
                  id="fooditem_name"
                  spellCheck={false}
                  value={foodName}
                  onChange={(e) => {
                    setFoodName(e.target.value);
                  }}
                  required
                />
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>
              <div className="form-field">
                <label htmlFor="food_price">Price</label>
                <input
                  type="number"
                  className="text-input"
                  placeholder="100"
                  id="food_price"
                  spellCheck={false}
                  value={foodPrice}
                  onChange={(e) => {
                    setFoodPrice(e.target.value);
                  }}
                  min={10}
                  max={10000}
                  required
                />
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>
              <div className="form-field">
                <label htmlFor="select_restaurant">Select Restaurant</label>
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
              </div>
              <div className="form-field">
                <label htmlFor="restaurant_address">
                  Food Details (optional){" "}
                </label>
                {/* <input
                type="text"
                className="text-input"
                placeholder="address"
                id="restaurant_address"
                spellCheck={false}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              /> */}
                <textarea
                  value={foodDetails}
                  placeholder="e.g. Serves 1 | Good Food Equals Good Mood! Have you tried ?"
                  onChange={(e) => setFoodDetails(e.target.value)}
                ></textarea>
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>

              <div className="form-btns">
                <button className="add-fooditem-btn">
                  {/* {createUser.isLoading ? "Creating account" : "Create account"} */}
                  Add Food Item
                </button>
              </div>
              {/* <p className="already-acc">
              Already have an account? <Link to="/login"> Sign in</Link>
            </p>
            <p style={{ textAlign: "center", margin: "10px" }}>OR</p>
            <p className="already-acc">
              Are you restaurant owner?{" "}
              <Link to="/partner-signup">Sign up here</Link>
            </p> */}
            </form>
            {errorMessage && (
              <p
                style={{ textAlign: "center", color: "red", fontSize: "20px" }}
              >
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
