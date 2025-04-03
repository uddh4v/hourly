import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/userInfoSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
