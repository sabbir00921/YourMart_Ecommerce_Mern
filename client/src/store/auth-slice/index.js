import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
// register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async function registerUser(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/registration",
        formData,
        { withCredentials: true }
      );
      // console.log("Success:", res.data);
      return response.data;
    } catch (err) {
      // console.log("Error response:", err);
      return err.response?.data;
    }
  }
);
// Login user
export const loginUser = createAsyncThunk(
  "/auth/login",
  async function loginUser(formData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/user-login",
        formData,
        { withCredentials: true }
      );
      // console.log("Success:", res.data);
      return response.data;
    } catch (err) {
      // console.log("Error response:", err);
      return err.response?.data;
    }
  }
);

export const checkAuthentication = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            // Expires: "0",
          },
        }
      );
      // console.log("Success:", response.data);
      return response.data;
    } catch (err) {
      // console.log("Error response:", err);
      return err.response?.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.data : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Aunticate user
      .addCase(checkAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.data : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
