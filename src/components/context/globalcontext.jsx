"use client";

import { createContext, useReducer } from "react";
import { globaldata } from "./globaldata";
import { message } from "antd";
import { globalreducer } from "./globalreducer";
import { products } from "@/data/product/products";

export const AppContext = createContext();

const GlobalContext = ({ children }) => {

  const initialState = {
    user: null,
    isLoggedIn: false,
    product: {
      productList: products
    },
    cart: {
      cartList: []
    }
  };

  const [state, dispatch] = useReducer(globalreducer, initialState);

  console.log("state", state)

  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const errorMsg = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const warningMsg = (msg) => {
    messageApi.open({
      type: "warning",
      content: msg,
    });
  };

  const addItemToCart = (itemId) => {
    // console.log("itemId", itemId)
    const findItem = state.product.productList?.map((el) => ({...el, quantity: 0}))?.find(el => el?.id===itemId)

    console.log(findItem, findItem)

    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: {
        item: findItem
      }
    })
  }


  return (
    <AppContext.Provider
      value={{
        state,
        toast: { successMsg, errorMsg, warningMsg },
        action: {
          addItemToCart: addItemToCart,
        }
      }}
    >
      {children}
      {contextHolder}
    </AppContext.Provider>
  );
};

export default GlobalContext;
