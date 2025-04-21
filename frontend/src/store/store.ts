// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/counterSlice";
import userReducer from "./reducers/userSlice";
import userIdReducer from "./reducers/userIdSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    userId: userIdReducer,
  },
});

// Define the RootState type based on the store's state shape
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;
