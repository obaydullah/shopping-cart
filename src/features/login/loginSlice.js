import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("login")
  ? JSON.parse(localStorage.getItem("login"))
  : { loggedIn: false, phone: "", password: "" };

// create slice
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    activeLogin: (state, action) => {
      state.loggedIn = true;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
      state.admin = action.payload.admin;

      localStorage.setItem("login", JSON.stringify(state));
    },

    removeLogin: (state) => {
      state.loggedIn = false;
      state.phone = "";
      state.password = "";
      state.admin = false;

      localStorage.removeItem("login");
    },
  },
});

export default loginSlice.reducer;
export const { activeLogin, removeLogin } = loginSlice.actions;
