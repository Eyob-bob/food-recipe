import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    accessToken:
      typeof window !== "undefined" && localStorage.getItem("accessToken"),

    refreshToken:
      typeof window !== "undefined" && localStorage.getItem("refreshToken"),
    verified: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.user = {
        accessToken:
          typeof window !== "undefined" && localStorage.getItem("accessToken"),

        refreshToken:
          typeof window !== "undefined" && localStorage.getItem("refreshToken"),
      };
    },
    logout: (state) => {
      state.user = {
        accessToken:
          typeof window !== "undefined" &&
          localStorage.removeItem("accessToken"),

        refreshToken:
          typeof window !== "undefined" &&
          localStorage.removeItem("refreshToken"),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
