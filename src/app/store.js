import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../features/register/registerSlice";
import loginSlice from "../features/login/loginSlice";
import cartSlice from "../features/cart/cartSlice";
import checkoutSlice from "../features/checkout/checkoutSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});
