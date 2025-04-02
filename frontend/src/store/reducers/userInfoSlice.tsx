// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoading: (state) => {
      state.status = "loading";
    },
    setUser: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    setUserError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setUserLoading, setUser, setUserError } = userSlice.actions;

export default userSlice.reducer;
