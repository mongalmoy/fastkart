"use client";

import { createContext } from "react";
import { message } from "antd";
import { Providers } from "@/react-redux/provider";


export const AppContext = createContext();

const WrapperContext = ({ children }) => {
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
    <Providers>
      <AppContext.Provider
        value={{
          toast: { success, error, warning },
        }}
      >
        {children}
        {contextHolder}
      </AppContext.Provider>
    </Providers>
  );
};

export default WrapperContext;
