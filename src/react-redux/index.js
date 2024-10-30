import { combineReducers } from "redux";

import productReducer from "./slices/products/productSlice";
import cartReducer from "./slices/carts/cartSlice";
import viewpageReducer from "./slices/viewpage/viewpageSlice";
import userReducer from './slices/users/userSlice';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  viewpage: viewpageReducer,
  user: userReducer,
})

export default rootReducer;