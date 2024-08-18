import "@/pages/cart/cart.css";
import OrderSummery from "@/pages/cart/ordersummery";
import ShoppingCart from "@/pages/cart/shoppingcart";
import { Grid } from "@mui/material";

export default function Cart() {
  return (
    <div className="cart">
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} className="p-0">
          <ShoppingCart />
        </Grid>
        <Grid item lg={4} md={4} sm={12}>
          <OrderSummery />
        </Grid>
      </Grid>
    </div>
  );
}
