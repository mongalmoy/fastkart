import { createSlice } from "@reduxjs/toolkit";

const viewpageSlice = createSlice({
  name: "viewpage",
  initialState: {
    itemDetails: null,
  },
  reducers: {
    setViewPageItem: (state, action) => {
      state.itemDetails = action.payload;
    },
  },
});

export const { setViewPageItem } = viewpageSlice.actions;
export default viewpageSlice.reducer;
