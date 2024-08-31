"use client"
import { useContext } from "react";
import "./cart.css";
import { Typography } from "@mui/material";
import { AppContext } from "@/components/context/globalcontext";

const OrderSummery = () => {
  const GlobalContext = useContext(AppContext);

  console.log(GlobalContext);

  const cartlist = GlobalContext?.state?.cart?.cartList;

  console.log("cartlist", cartlist);

  const subTotal = cartlist?.reduce((total, el) => total+=(el.price * el.quantity), 0)
  const gst = subTotal * 0.12;
  const handlingFees = subTotal>0 ? 50 : 0;

  console.log(subTotal)
  console.log(gst)
  console.log(handlingFees)

  return (
    <div className="order_summery">
      <h1>Order Summery</h1>
      <div className="order_description_container">
        <p>
          Shipping and additional costs are calculated based on value you have
          entered
        </p>
        <hr />

        <div className="order_desc_item">
          <Typography variant="body2" fontSize={14}>
            Order sub-total
          </Typography>
          <Typography variant="body2" fontSize={14}>
            {"₹  "}{subTotal}
          </Typography>
        </div>
        <hr />
        <div className="order_desc_item">
          <Typography variant="body2" fontSize={14}>
            Shipping & handling fees
          </Typography>
          <Typography variant="body2" fontSize={14}>
            {"₹  "}{handlingFees}
          </Typography>
        </div>
        <hr />
        <div className="order_desc_item">
          <Typography variant="body2" fontSize={14}>
            GST (12%)
          </Typography>
          <Typography variant="body2" fontSize={14}>
            {"₹  "}
            {gst}
          </Typography>
        </div>
        <hr />
        <div className="order_total">
          <Typography variant="h6" fontSize={14}>
            Order sub total
          </Typography>
          <Typography variant="h6" fontSize={14}>
            {"₹  "}{Number(subTotal) + Number(gst) + Number(handlingFees)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
