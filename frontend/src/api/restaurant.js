import axios from "axios";
export const addRestaurantDetailsAPI = async (details) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/restaurant",
      details,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const addFoodItemDetailsAPI = async (details) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/restaurant/add-food-item",
      details,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getAllRestaurantsAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/restaurant/",
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getRestaurntByIdAPI = async ({ id }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/restaurant/${id}`,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
