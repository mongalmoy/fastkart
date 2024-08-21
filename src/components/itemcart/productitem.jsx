"use client";

import { Suspense, useContext } from "react";
import "./productitem.css";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../context/globalcontext";
import Image from "next/image";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const ProductItem = (props) => {
  const GlobalContext = useContext(AppContext);

  const action = GlobalContext?.action;
  const toast = GlobalContext?.toast;

  return (
    <Card sx={{ maxWidth: 345 }} className="py-2">
      <ErrorBoundary>
        <Suspense fallback={<div>Product Image is loading</div>}>
          <Image
            src={props?.imgUrl}
            alt={props?.name}
            className="product_image"
            width={120}
            height={140}
          />
        </Suspense>
      </ErrorBoundary>
      <CardContent className="py-1">
        <Typography gutterBottom variant="h5" component="div" className="m-0">
          {props?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ₹ {props?.price}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-around" }}>
        <button
          className="page_button flexbox"
          onClick={() => {
            action?.addItemToCart(props?.id);
            toast?.successMsg("Item added to cart");
          }}
        >
          <FaShoppingCart className="me-1" /> Add to Cart
        </button>
        <button
          className="page_button_outline"
          style={{ visibility: "hidden" }}
        >
          View Details
        </button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
