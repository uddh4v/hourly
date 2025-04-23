// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
}

// Load from localStorage on startup
const storedUserId = localStorage.getItem("userId");

const initialState: AuthState = {
  userId: storedUserId || null,
};

const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      localStorage.setItem("userId", action.payload); // persist it
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      localStorage.removeItem("userId"); // clear from storage
      state.userId = null;
    },
  },
});

export const { setUserId, clearUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
