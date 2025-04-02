import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/reducers/userInfoSlice";
export const store = configureStore({
  reducer: {
    user: userReducer, // Add reducers here
  },
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
