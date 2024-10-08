"use client";

import "@/styles/app/cart/cart.css";
import OrderSummery from "@/page/cart/ordersummery";
import ShoppingCart from "@/page/cart/shoppingcart";
import { Alert, AlertTitle, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Cart() {
  const cartList = useSelector((state) => state?.cart?.cartList);

  const router = useRouter();

  console.log(cartList);

  return (
    <div className="cart">
      {cartList?.length === 0 ? (
        <div>
          <Alert severity="warning" className="cart_empty_alert mb-5">
            <AlertTitle>Your basket is empty</AlertTitle>
            {`To continue with your purchase, please ensure that you've added at
            least one item to your cart.`}
          </Alert>

          <Button
            className="cart_empty_btn"
            role={undefined}
            variant="contained"
            startIcon={<FaPlus />}
            onClick={() => {
              router.push("/product");
            }}
          >
            Add Products
          </Button>
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} className="p-0 w-full">
            <ShoppingCart />
          </Grid>
          <Grid item lg={4} md={4} sm={12} className="cart_summery_div">
            <OrderSummery />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
