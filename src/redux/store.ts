import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "@/redux/features/services"
import postReducer from "@/redux/features/posts"
import userReducer from "@/redux/features/user"
export const store = configureStore({
  reducer: {
    serviceReducer,
    postReducer,
    userReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


