"use client";

import { createContext, useState } from "react";
import { message } from "antd";
import { Providers } from "@/react-redux/provider";
import { CircularProgress } from "@mui/material";

export const AppContext = createContext();

const WrapperContext = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loader, setLoader] = useState(false);

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

  const loading = (val) => {
    console.log("loading triggered...........")
    setLoader(val)
  }

  return (
    <Providers>
      <AppContext.Provider
        value={{
          toast: { success, error, warning },
          loader, 
          loading
        }}
      >
        {children}
        {contextHolder}
        {loader ? (
          <CircularProgress
            size="30px"
            style={{
              position: "fixed",
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "999",
            }}
          />
        ) : null}
      </AppContext.Provider>
    </Providers>
  );
};

export default WrapperContext;