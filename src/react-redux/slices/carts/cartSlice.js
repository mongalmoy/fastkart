import { createSlice } from "@reduxjs/toolkit";
import { getProductList } from "../products/productSlice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },
  reducers: {
    getCartList: (state, action) => {
      return state.cartList;
    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      const cartlist = state?.cartList;

      const foundEl = cartlist?.find((el) => el?.id == item?.id);
      if (foundEl) {
        const newList = cartlist?.map((el) =>
          el?.id === item?.id ? { ...el, quantity: el.quantity + 1 } : el
        );
        state.cartList = newList;
      } else {
        state.cartList = [...state?.cartList, { ...item, quantity: 1 }];
      }
    },
    removeItemToCart: (state, action) => {
      const item = action.payload;
      const cartlist = state?.cartList;

      const foundEl = cartlist?.find((el) => el?.id == item?.id);
      if (foundEl.quantity > 1) {
        const newList = cartlist?.map((el) =>
          el?.id === item?.id ? { ...el, quantity: el.quantity - 1 } : el
        );
        state.cartList = newList;
      } else if (foundEl.quantity == 1) {
        const newList = cartlist?.filter((el) => el?.id !== item?.id);
        state.cartList = newList;
      }
    },
  },
});

export const { addItemToCart, removeItemToCart, getCartList } =
  cartSlice.actions;
export default cartSlice.reducer;
