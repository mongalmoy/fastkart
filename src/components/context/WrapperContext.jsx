"use client";

import { createContext, useReducer } from "react";
import { message } from "antd";
import { products } from "@/data/product/products";
import { Provider } from "react-redux";
import { store } from "@/react-redux/store";

export const AppContext = createContext();

const WrapperContext = ({ children }) => {
  const initialState = {
    user: null,
    isLoggedIn: false,
    product: {
      productList: products,
    },
    cart: {
      cartList: [],
    },
    currentPage: "",
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const warning = (msg) => {
    messageApi.open({
      type: "warning",
      content: msg,
    });
  };

  return (
    <Provider store={store}>
      <AppContext.Provider
        value={{
          toast: { success, error, warning },
        }}
      >
        {children}
        {contextHolder}
      </AppContext.Provider>
    </Provider>
  );
};

export default WrapperContext;
