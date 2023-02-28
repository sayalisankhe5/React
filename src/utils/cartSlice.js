import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuatity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        const tempItem = { ...action.payload, quantity: 1 };
        state.items.push(tempItem);
      }
    },
    clearcart: (state, action) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
  },
});

export const { addItem, clearcart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
