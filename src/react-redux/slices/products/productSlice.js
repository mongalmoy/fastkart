import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
  },
  reducers: {
    getProductList: (state) => {
      return state.productList;
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    }
  },
});

export const { getProductList, setProductList } = productSlice.actions;
export default productSlice.reducer;