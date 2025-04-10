// src/store/slices/userSlice.ts
import { User } from "@/interface/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the user data

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
