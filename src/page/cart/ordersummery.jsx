"use client"

// import "@/styles/app/cart";
import { Typography } from "@mui/material";

const OrderSummery = ({cartList=[], userCart=[]}) => {
  // const cartList = useSelector((state) => state?.cart?.cartList);

  const subTotal = cartList?.reduce((total, el) => total+=(el.price * el.quantity), 0)
  const gst = subTotal * 0.12;
  const handlingFees = subTotal>0 ? 50 : 0;

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
            <b>{"₹"}{Number(subTotal) + Number(gst) + Number(handlingFees)}</b>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
