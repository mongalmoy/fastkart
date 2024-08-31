"use client";

import { lazy, Suspense, useContext, useEffect } from "react";
import "./homepage.css";
import Image from "next/image";
import HomepageCard from "@/components/homepagecard/homepagecard";
import { homepagecard } from "@/data/homepagedata/homepagedata";
import { Grid } from "@mui/material";
import { AppContext } from "@/components/context/globalcontext";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const ProductItem = lazy(() => import("@/components/itemcart/productitem"));

const Homepage = () => {
  const GlobalContext = useContext(AppContext);

  return (
    <div className="homepage_container">
      <div className="homepage_mega_img_container">
        <div className="left_arrow_outer">
          <div className="arrow_inner">
        <LuArrowLeft />
          </div>
        </div>
        <div className="homepage_image_container">
          <Suspense fallback={<div>Image is loading...</div>}>
            <Image
              src={"/assets/img/homepage/homepage_image.jpg"}
              width={600}
              height={200}
              alt="homepage_image"
            />
          </Suspense>
          <div className="homepage_image_content">
            <div className="image_left_content">
              <h3>FLAGSHIP SALE</h3>
              <p className="mb-3">Jackpot Days</p>
              <p>
                13<sup>th</sup> - 15<sup>th</sup> AUG
              </p>
            </div>
          </div>
        </div>
        
        <div className="right_arrow_outer">
          <div className="arrow_inner">
          <LuArrowRight />
          </div>
        </div>
        </div>

      <div className="homepage_product_card my-5">
        {homepagecard.map((el, ind) => {
          return <HomepageCard key={ind} name={el.name} text={el.content} />;
        })}
      </div>

      <h1 className="our_latest_products my-4">Our Latest Products</h1>

      <Grid container spacing={3} className="product_items_container mt-5">
        {GlobalContext?.state?.product?.productList?.map((el, ind) => {
          return (
            <Grid key={ind} item xs={6} md={4} lg={3}>
              <Suspense fallback={<div>Product Item is loading...</div>}>
                <ProductItem
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
              </Suspense>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Homepage;
