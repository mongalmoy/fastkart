"use client";

import { AppContext } from "@/components/context/globalcontext";
import "@/pages/cart/cart.css";
import OrderSummery from "@/pages/cart/ordersummery";
import ShoppingCart from "@/pages/cart/shoppingcart";
import { Grid } from "@mui/material";
import { Alert } from "antd";
import { useContext, useEffect } from "react";

export default function Cart() {
  const GlobalContext = useContext(AppContext);

  const cartlist = GlobalContext?.state?.cart?.cartList;

  useEffect(() => {
    GlobalContext?.action?.setCurrentPage("cart")
  }, [])

  return (
    <div className="cart">
      {cartlist?.length === 0 ? (
        <Alert
          message="Cart is Empty"
          description="To continue with your purchase, please ensure that you've added at least one item to your cart."
          type="warning"
          showIcon
          className="mb-5"
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} className="p-0">
            <ShoppingCart />
          </Grid>
          <Grid item lg={4} md={4} sm={12}>
            <OrderSummery />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
