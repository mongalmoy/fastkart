"use client";

import "./homepage.css";
import Image from "next/image";
import HomepageCard from "@/components/homepagecard/homepagecard";
import { homepagecard } from "@/data/homepagedata/homepagedata";
import { Grid } from "@mui/material";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const LazyProductItem = dynamic(
  () => import("@/components/itemcart/productitem"),
  {
    loading: () => <div>Product Item is loading...</div>,
  }
);

const Homepage = () => {
  const products = useSelector((state) => state?.product?.productList);

  return (
    <div className="homepage_container">
      <div className="homepage_mega_img_container">
        <div className="left_arrow_outer">
          <div className="arrow_inner">
            <LuArrowLeft />
          </div>
        </div>
        <div className="homepage_image_container">
          <Image
            src={"/assets/img/homepage/homepage_image.jpg"}
            width={600}
            height={200}
            alt="homepage_image"
            loading="lazy"
            // loader={"Homepage image loading..."}
          />
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
    </div>
  );
};

export default Homepage;
