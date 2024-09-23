import { combineReducers } from "redux";

import productReducer from "./products/productSlice";
import cartReducer from "./carts/cartSlice";
import viewpageReducer from "./viewpage/viewpageSlice";
import userReducer from './users/userSlice';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  viewpage: viewpageReducer,
  user: userReducer,
})

export default rootReducer;