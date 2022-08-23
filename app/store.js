import { configureStore } from "@reduxjs/toolkit";
import isOpenReducer from "../redux-slices/isOpenSlice";
import userReducer from "../redux-slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    isOpen: isOpenReducer,
  },
});
