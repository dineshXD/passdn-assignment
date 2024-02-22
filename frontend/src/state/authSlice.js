import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkUserAPI,
  loginAPI,
  logoutAPI,
  signupAPI,
  signupPartnerAPI,
} from "../api/auth";
const initialState = {
  isLoggedIn: false,
};
export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await loginAPI(credentials);

  return response.data;

  // return response.data;
});
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await logoutAPI();
  return response.data;
});
export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  const response = await signupAPI(credentials);
  console.log(response);
  if (response?.response?.data.status === "failed") {
    return response.response.data.message;
  }
  return response.data;
  // try {
  //   const response = await axios.post(
  //     "http://localhost:3000/api/v1/auth/signup",
  //     credentials,
  //     { withCredentials: true }
  //   );
  //   return response.data;
  // } catch (error) {
  //   return error.response.data; // Throw error response for error handling
  // }
});
export const signupAsPartner = createAsyncThunk(
  "auth/signuppartner",
  async ({ email, password, confirmPassword, role = "restaurantOwner" }) => {
    const response = await signupPartnerAPI({
      email,
      password,
      confirmPassword,
      role,
    });
    console.log(response);
    if (response?.response?.data.status === "failed") {
      return response.response.data.message;
    }
    return response.data;
  }
);
export const checkUserStatus = createAsyncThunk(
  "auth/checkUserStatus",
  async () => {
    const response = await checkUserAPI(); // Call the API function to check user authentication
    return response.data; // Return the data from the response
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(checkUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.user == null) {
          state.isLoggedIn = false;
          state.error = action.payload;
        } else {
          state.isLoggedIn = true;
          state.user = action.payload.user;
        }
      })
      .addCase(signupAsPartner.fulfilled, (state, action) => {
        if (action.payload.user == null) {
          state.isLoggedIn = false;
          state.error = action.payload;
        } else {
          state.isLoggedIn = true;
          state.user = action.payload.user;
        }
      });
  },
});
// export const { logout } = authSlice.actions;
// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;
