"use client";

import "@/styles/component/itemcart/productitem.css";
import {  useContext } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../../../components/context/WrapperContext";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/react-redux/slices/carts/cartSlice";
import { setViewPageItem } from "@/react-redux/slices/viewpage/viewpageSlice";
import { useRouter } from "next/navigation";

const ProductItem = (props) => {
  const GlobalContext = useContext(AppContext);
  const toast = GlobalContext?.toast;

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345 }} className="product_item py-2">
      <Image
        src={props?.item?.imageURL}
        alt={props?.item?.name}
        className="product_image"
        width={120}
        height={140}
        priority
      />
      <CardContent className="py-1">
        <Typography gutterBottom variant="h5" component="div" className="product_name m-0">
          {props?.item?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" className="product_price">
          ₹ {props?.item?.price}
        </Typography>
      </CardContent>
      <CardActions className="product_item_footer_buttons">
        <button
          className="page_button_outline"
          onClick={() => {
            dispatch(setViewPageItem(props?.item));
            router.push("/viewproduct");
          }}
        >
          View Details
        </button>
        <button
          className="page_button flexbox"
          onClick={() => {
            dispatch(
              addItemToCart({
                item: props?.item,
                itemCnt: 1,
              })
            );
            toast?.success("Item added to cart");
            router.push("/cart");
          }}
        >
          <FaShoppingCart className="product_add_to_cart_icon me-1" /> Add to Cart
        </button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
