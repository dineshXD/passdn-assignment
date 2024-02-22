import { useEffect, useState } from "react";
import "./restaurant.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantDetails } from "../state/restaurantSlice";
export const AddRestaurantDetails = () => {
  const [name, setName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const user = useSelector((state) => state.auth)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.user._id);
  const restaurant = useSelector((state) => state.restaurant.restaurantDetail);
  const errors = useSelector((state) => state.restaurant.error);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = { name, foodCategory, address, contactNumber, userId };
      // console.log("Restaurant added successfully:", data);
      await dispatch(addRestaurantDetails(data));
      if (errors) {
        errorMessage(errors);
      } else {
        navigate("../add-food-item", {
          replace: true,
          // state: { restaurandId: restaurant.restaurant._id },
        });
      }
    } catch (error) {
      console.log(error);
    }
    // await dispatch(signup({ email, password, confirmPassword }));
  };
  useEffect(() => {
    // If user is logged in, navigate to homepage
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
  return (
    <>
      <main className="add-details">
        <div className="restaurant-content">
          <h2>Add Restaurant details</h2>
          {/* {errors.signupError && (
            <p className="authError">
              {createUser.error?.response?.data?.message || errors.signupError}
            </p>
          )} */}
          <div className="restaurant-form details-form">
            <form onSubmit={submitForm}>
              <div className="form-field">
                <label htmlFor="restaurant_name">Restaurant name</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="Pass Restaurant"
                  id="restaurant_name"
                  spellCheck={false}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>
              <div className="form-field">
                <label htmlFor="food_category">Food Category:</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. Pizza,Chinese,Indian"
                  id="food_category"
                  spellCheck={false}
                  value={foodCategory}
                  onChange={(e) => {
                    setFoodCategory(e.target.value);
                  }}
                  required
                />
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>
              <div className="form-field">
                <label htmlFor="restaurant_address">Restaurant Address:</label>
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
                  value={address}
                  placeholder="near bandra mumbai 400001"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>
              <div className="form-field">
                <label htmlFor="restaurant_contactNumber">
                  Restaurant Contact Number:
                </label>
                <input
                  type="number"
                  className="text-input"
                  placeholder="900000000"
                  id="restaurant_contactNumber"
                  spellCheck={false}
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                  min={1000000000} // Minimum value allowed (10 digits)
                  max={9999999999} // Maximum value allowed (10 digits)
                  required
                />
                {/* {errors.email && <p className="authError">{errors.email}</p>} */}
              </div>
              <div className="form-btns">
                <button className="add-restaurant-btn">
                  {/* {createUser.isLoading ? "Creating account" : "Create account"} */}
                  Add Restaurant
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

// export const Signup = () => {

// };
