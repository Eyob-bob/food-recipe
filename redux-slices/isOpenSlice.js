import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const isOpenSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    opened: (state) => {
      state.isOpen = true;
    },
    closed: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { opened, closed } = isOpenSlice.actions;

export default isOpenSlice.reducer;
