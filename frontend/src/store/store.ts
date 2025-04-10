// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/counterSlice";
import  userReducer  from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

// Define the RootState type based on the store's state shape
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;
