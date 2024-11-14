import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    data: null,
  },
  reducers: {
    setCheckoutData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
