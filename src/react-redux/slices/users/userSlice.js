import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userDetails: {},
    userId: null,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  },
});

export const { setIsLoggedIn, setUserInfo, setUserId } = userSlice.actions;
export default userSlice.reducer;
