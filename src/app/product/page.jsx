"use client";

import NoResultPage from "@/components/NoResultPage/NoResultPage";
import ProductFilter from "@/components/productfilter/productfilter";
import { Grid, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LazyProductItem = dynamic(
  () => import("@/components/itemcart/productitem"),
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

const Product = () => {
  const productList = useSelector((state) => state?.product?.productList);

  const [products, setProducts] = useState(productList);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    const inputValLow = e.target.value?.toLowerCase();

    const filteredProd = productList?.filter((el) => {
      if (
        el?.color?.toLowerCase()?.includes(inputValLow) ||
        el?.gender?.toLowerCase()?.includes(inputValLow) ||
        el?.name?.toLowerCase()?.includes(inputValLow) ||
        el?.type?.toLowerCase()?.includes(inputValLow)
      ) {
        return el;
      }
    });

    setInputText(inputVal);
    setProducts(filteredProd);
  };

  const handleEraseInput = () => {
    setInputText("");
    setProducts(productList);
  };

  const handleFilter = (val) => {
    const filteredProd = productList?.filter((el) => {
      if (el?.type?.toLowerCase()?.includes(val)) {
        return el;
      }
    });
    setProducts(filteredProd);
  };

  const handleFilterByGender = (val) => {
    const filteredProd = productList?.filter((el) => {
      if (el?.gender?.toLowerCase()?.includes(val)) {
        return el;
      }
    });
    setProducts(filteredProd);
  };

  // console.log("products", products);

  return (
    <div className="product_page">
      <ProductFilter
        inputText={inputText}
        handleInputChange={handleInputChange}
        handleEraseInput={handleEraseInput}
        handleFilter={handleFilter}
        handleFilterByGender={handleFilterByGender}
      />
      <div className="products_container">
        {products?.length > 0 ? (
          <Grid container spacing={3}>
            {products?.map((el, ind) => {
              return (
                <Grid key={el?.toString() + ind} item xs={6} md={4} lg={3}>
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
        ) : (
          <NoResultPage />
        )}
      </div>
    </div>
  );
};

export default Product;
