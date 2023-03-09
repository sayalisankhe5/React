import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      var token = localStorage.getItem("authToken");
      if (state.items.length > 0) {
        if (state.items[0].restId == action.payload.restId) {
          const itemIndex = state.items.findIndex(
            (item) => item.id == action.payload.id
          );
          if (itemIndex >= 0) {
            state.items[itemIndex].quantity += 1;
          } else {
            const tempItem = { ...action.payload, quantity: 1 };
            state.items.push(tempItem);
          }
        } else {
          toast.error(
            "Please clear the existing items from cart before adding items from different restaurant",
            {
              position: "bottom-left",
            }
          );
        }
      } else {
        const itemIndex = state.items.findIndex(
          (item) => item.id == action.payload.id
        );
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity += 1;
        } else {
          const tempItem = { ...action.payload, quantity: 1 };
          state.items.push(tempItem);
        }
        if (!token) {
          toast.error("Kindly LOGIN first before adding items in cart", {
            position: "bottom-left",
          });
        }
      }

      if (token) {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    setItems: (state, action) => {
      state.items = [...action.payload];
    },
    clearcart: (state, action) => {
      var token = localStorage.getItem("authToken");
      state.items = [];
      if (token) {
        localStorage.removeItem("cart");
      }
    },
    removeItem: (state, action) => {
      var token = localStorage.getItem("authToken");
      const newItems = state.items.filter(
        (item) => item.id != action.payload.id
      );
      state.items = newItems;

      if (token) {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    incrementQuantity: (state, action) => {
      var token = localStorage.getItem("authToken");

      const itemIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
      if (token) {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrementQuantity: (state, action) => {
      var token = localStorage.getItem("authToken");

      const itemIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity == 1) {
          const newItems = state.items.filter(
            (item) => item.id != action.payload.id
          );
          state.items = newItems;
        } else {
          state.items[itemIndex].quantity = state.items[itemIndex].quantity - 1;
        }
      }
      if (token) {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    calculateTotals: (state, action) => {
      let cartTotal = state.items.reduce(
        (cartTotal, item) => {
          item.price > 0
            ? (cartTotal.total +=
                item.quantity * Number(item.price.toString().slice(0, -2)))
            : (cartTotal.total +=
                item.quantity *
                Number(item.defaultPrice.toString().slice(0, -2)));
          cartTotal.totalquantity += item.quantity;

          return cartTotal;
        },
        {
          total: 0,
          totalquantity: 0,
        }
      );

      state.totalQuantity = cartTotal.totalquantity;
      state.totalAmount = cartTotal.total;
    },
  },
});

export const {
  addItem,
  clearcart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  calculateTotals,
  setItems,
} = cartSlice.actions;

export default cartSlice.reducer;
