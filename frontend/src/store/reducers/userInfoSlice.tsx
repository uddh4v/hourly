import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: unknown | null; // Change `any` to a proper type if using TypeScript
}

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<unknown>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
