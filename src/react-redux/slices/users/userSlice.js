import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userDetails: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userDetails = action.payload;
    }
  },
});

export const { setIsLoggedIn, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
