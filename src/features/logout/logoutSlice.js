import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    jwtToken: null,
  },
  reducers: {
    setSelectedToken: (state, action) => {
      state.jwtToken = action.payload;
    },
  },
});

export const { setSelectedToken } = tokenSlice.actions;

export default tokenSlice.reducer;
