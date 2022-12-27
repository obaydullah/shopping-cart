import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// create slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      let newItem = action.payload;
      let existingItem;

      //Find the item is already exists in Cart
      if (state.length > 0) {
        state.map((item) => {
          if (item.id === newItem.id) {
            existingItem = { ...item, quantity: (item.quantity += 1) };
            return existingItem;
          }
        });
      }

      if (existingItem) {
        newItem = existingItem;
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeCart: (state, action) => {
      state = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    },
    incrementQuantity: (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.id) {
          return (item.quantity += 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      state.map((item) => {
        if (item.id == action.payload.id) {
          return (item.quantity -= 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state, action) => {
      state = [];
      localStorage.removeItem("cart");
      return state;
    },
  },
});

export default cartSlice.reducer;
export const {
  addCart,
  removeCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
