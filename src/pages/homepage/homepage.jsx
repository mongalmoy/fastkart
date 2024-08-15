import React from "react";
import "./homepage.css";
import Image from "next/image";
import HomepageCard from "@/components/homepagecard/homepagecard";
import { homepagecard } from "@/data/homepagedata/homepagedata";
import { Grid } from "@mui/material";
import ProductItem from "@/components/itemcart/productitem";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage_mega_img_container">
        <div className="homepage_image_container">
          <Image
            src={"/assets/img/homepage/homepage_image.jpg"}
            width={600}
            height={200}
            alt="homepage_image"
          />
          <div className="homepage_image_content">
            <div className="image_left_content">
              <h3>FLAGSHIP SALE</h3>
              <p>Jackpot Days</p>
              <p>
                13<sup>th</sup> - 15<sup>th</sup> AUG
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="homepage_product_card">
        {homepagecard.map((el,ind) => {
          return (
            <HomepageCard
              key={ind}
              name={el.name}
              text={el.content}
            />
          )
        })}
      </div>

      <h1 className="our_latest_products">Our Latest Products</h1>

      <Grid spacing={3}>
        <Grid item xs={2} md={4} lg={4}>
          <ProductItem />
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
