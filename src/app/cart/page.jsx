"use client";

import "@/styles/app/cart/cart.css";
import OrderSummery from "@/pages/cart/ordersummery";
import ShoppingCart from "@/pages/cart/shoppingcart";
import { Grid } from "@mui/material";
import { Alert } from "antd";
import { useSelector } from "react-redux";

export default function Cart() {

  const cartList = useSelector(state => state?.cart?.cartList);

  console.log(cartList)

  return (
    <div className="cart">
      {cartList?.length === 0 ? (
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
