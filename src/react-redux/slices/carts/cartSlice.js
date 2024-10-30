import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCount: 0,
    cartList: [],
  },
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    getCartList: (state, action) => {
      return state.cartList;
    },
    addItemToCart: (state, action) => {
      const item = action.payload?.item;
      const itemCnt = action.payload?.itemCnt;

      const cartlist = state?.cartList;

      const foundEl = cartlist?.find((el) => el?.id == item?.id);
      if (foundEl) {
        const newList = cartlist?.map((el) =>
          el?.id === item?.id ? { ...el, quantity: el.quantity + itemCnt } : el
        );
        state.cartList = newList;
      } else {
        state.cartList = [...state?.cartList, { ...item, quantity: itemCnt }];
      }
    },
    removeItemToCart: (state, action) => {
      const items = action.payload;
      const cartlist = state?.cartList;
      let newList = cartlist;

      items.forEach(element => {
        const foundEl = cartlist?.find((el) => el?.id == element?.id);
        const foundInd = cartlist?.findIndex(el => el?.id == element?.id)

        if(foundInd>=0) {
          if(Number(foundEl?.quantity)-Number(element?.count)>1) {
            newList[foundInd].quantity -= element?.count;
          } else {
            newList = newList.filter((_,ind) => ind!==foundInd)
          }
        }
      });

      state.cartList = newList;

      
    },
  },
});

export const { setCartCount, addItemToCart, removeItemToCart, getCartList } =
  cartSlice.actions;
export default cartSlice.reducer;
