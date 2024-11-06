"use client";

import { apis } from "@/lib/constants";
import { Grid, Skeleton } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await getProducts();
      setProducts(products)
    })()
  }, [])

  async function getProducts() {
    try {
      const products = await axios.get(apis.SERVER_BASE_URL + "api/products");
  
      return products.data;
    } catch(error) {
      console.log(error)
      return [];
    }
  }

  return (
    <Grid container spacing={3} className="product_items_container mt-5">
      {products?.map((el, ind) => {
        return (
          <Grid key={ind} item xs={6} md={4} lg={3}>
            <LazyProductItem
              item={el}
              id={el?.id}
              imgUrl={el.imageurl}
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
