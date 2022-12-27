import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("register")
  ? JSON.parse(localStorage.getItem("register"))
  : [];

// create slice
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    activeRegister: (state, action) => {
      if (state.length > 0) {
        state.find((item) => {
          if (item.phone !== action.payload.phone) {
            state.push(action.payload);
            localStorage.setItem("register", JSON.stringify(state));
            return state;
          }
        });
      } else {
        state.push(action.payload);
        localStorage.setItem("register", JSON.stringify(state));
        return state;
      }
    },
  },
});

export default registerSlice.reducer;
export const { activeRegister } = registerSlice.actions;
