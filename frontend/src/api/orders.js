import axios from "axios";

export const placeOrderAPI = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/orders/place-order",
      data,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getUserOrdersAPI = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/orders/${userId}`,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getRestaurantOrdersAPI = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/orders/restaurant/${id}`,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const updateOrderStatusAPI = async (orderId, status) => {
  try {
    console.log(orderId, status);
    const response = await axios.patch(
      "http://localhost:3000/api/v1/orders/updateOrderStatus",
      { orderId, status },
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
