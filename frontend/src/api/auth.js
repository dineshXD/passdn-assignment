import axios from "axios";

export const loginAPI = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      credentials,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    throw error; // Propagate the error back to the caller
  }
};
export const logoutAPI = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    return response;
    // if (response.data.success === true) {
    //   dispatch(logout());
    //   navigate("/", { replace: true });
    // }
  } catch (error) {
    throw error;
  }
};
export const signupAPI = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      credentials,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error; // Propagate the error back to the caller
  }
};
export const signupPartnerAPI = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      credentials,
      {
        withCredentials: true, // Optional: Include this if you need to send cookies with the request
      }
    );
    return response;
  } catch (error) {
    return error; // Propagate the error back to the caller
  }
};

export const checkUserAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/auth/check-user",
      { withCredentials: true }
    );
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
