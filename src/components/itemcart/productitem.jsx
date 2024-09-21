"use client";

import "@/styles/component/itemcart/productitem.css";
import { Suspense, useContext } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../context/WrapperContext";
import Image from "next/image";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
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
    <Card sx={{ maxWidth: 345 }} className="py-2">
      <ErrorBoundary>
        <Suspense fallback={<div>Product Image is loading</div>}>
          <Image
            src={props?.item?.imageURL}
            alt={props?.item?.name}
            className="product_image"
            width={120}
            height={140}
          />
        </Suspense>
      </ErrorBoundary>
      <CardContent className="py-1">
        <Typography gutterBottom variant="h5" component="div" className="m-0">
          {props?.item?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
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
            dispatch(addItemToCart({
              item: props?.item, 
              itemCnt: 1
            }));
            toast?.success("Item added to cart");
            router.push("/cart");
          }}
        >
          <FaShoppingCart className="me-1" /> Add to Cart
        </button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
