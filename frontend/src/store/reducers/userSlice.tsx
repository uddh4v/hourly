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
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
