import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("checkout")
  ? JSON.parse(localStorage.getItem("checkout"))
  : [];

// create slice
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkout: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("checkout", JSON.stringify(state));
    },
  },
});

export default checkoutSlice.reducer;
export const { checkout } = checkoutSlice.actions;
