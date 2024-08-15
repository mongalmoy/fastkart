import React from "react";
import "./homepage.css";
import Image from "next/image";
import HomepageCard from "@/components/homepagecard/homepagecard";

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
            <p>13<sup>th</sup> - 15<sup>th</sup> AUG</p>
          </div>
        </div>
        </div>
        
      </div>

      <div className="homepage_product_card">
        <HomepageCard />
      </div>
    </div>
  );
};

export default Homepage;
