import { createSlice } from "@reduxjs/toolkit";

// Initial state from localStorage or default values
const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  email: localStorage.getItem("email") || "",
  authToken: localStorage.getItem("authToken") || "",
  userId: localStorage.getItem("userId") || null, // Retrieve userId from localStorage if exists
};

// Create slice for auth state management
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action for successful login
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.authToken = action.payload.authToken;
      state.userId = action.payload.userId;

      // Store data in localStorage
      localStorage.setItem("authToken", action.payload.authToken);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("userId", action.payload.userId);
    },
    // Action for logging out
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.authToken = "";
      state.userId = null;

      // Remove data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("userId"); // Remove userId from localStorage
    },
  },
});

// Exporting actions for use in components
export const { loginSuccess, logout } = authSlice.actions;

// Exporting reducer to be used in the store
export default authSlice.reducer;
