"use client";

import { createContext, useReducer } from "react";
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
    },
    currentPage: "",
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

  const removeItemToCart = (itemId) => {
    dispatch({
      type: "REMOVE_ITEM_TO_CART",
      payload: {
        itemId: itemId,
      }
    })
  }

  const updateCartList = (cartList) => {
    dispatch({
      type: "UPDATE_CARTLIST",
      payload: {
        cartList: cartList,
      }
    })
  }

  const deleteCartItems = (itemIdList) => {
    dispatch({
      type: "DELETE_CART_ITEMS",
      payload: itemIdList
    })
  }

  const setCurrentPage = (page) => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: page
    })
  }


  return (
    <AppContext.Provider
      value={{
        state,
        toast: { successMsg, errorMsg, warningMsg },
        action: {
          addItemToCart: addItemToCart,
          removeItemToCart: removeItemToCart,
          deleteCartItems: deleteCartItems,
          setCurrentPage: setCurrentPage,
        }
      }}
    >
      {children}
      {contextHolder}
    </AppContext.Provider>
  );
};

export default GlobalContext;
