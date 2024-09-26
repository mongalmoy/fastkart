"use client";

import { Grid, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const LazyProductItem = dynamic(
  () => import("@/page/product/itemcart/productitem"),
  {
    loading: () => (
      <>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={240}
          className="mb-2"
        />
        <Skeleton variant="rectangular" width={"100%"} height={50} />
      </>
    ),
    ssr: false,
  }
);

const HomepageProducts = () => {
  console.log("This is Homepage Product page................");

  const products = useSelector((state) => state?.product?.productList);

  return (
    <Grid container spacing={3} className="product_items_container mt-5">
      {products?.map((el, ind) => {
        return (
          <Grid key={ind} item xs={6} md={4} lg={3}>
            <LazyProductItem
              item={el}
              id={el?.id}
              imgUrl={el.imageURL}
              name={el.name}
              price={el.price}
              type={el.type}
              currency={el.currency}
              color={el.color}
              gender={el.gender}
              quantity={el.quantity}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HomepageProducts;
