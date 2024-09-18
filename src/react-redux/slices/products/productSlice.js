import { products } from "@/data/product/products";
import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: products,
  },
  reducers: {
    getProductList: (state) => {
      return state.productList;
    },
  },
});

export const { getProductList } = productSlice.actions;
export default productSlice.reducer;