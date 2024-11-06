import "@/styles/page/homepage/homepage.css";
import Image from "next/image";
import HomepageCard from "@/components/homepagecard/homepagecard";
import { homepagecard } from "@/data/homepagedata/homepagedata";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import HomepageProducts from "./HomepageProducts";
// import IsUserAuthentic from "@/utils/isUserAuthentic";

const HomePage = () => {
  return (
    <>
    <div className="homepage_container">
      <div className="homepage_mega_img_container">
        <div className="left_arrow_outer">
          <div className="arrow_inner">
            <LuArrowLeft />
          </div>
        </div>
        <div className="homepage_image_container">
          <Image
            src={"/assets/img/homepage/flagship_sale.jpg"}
            width={600}
            height={200}
            alt="homepage_image"
            priority
          />
          {/* <div className="homepage_image_content">
            <div className="image_left_content">
              <h3>FLAGSHIP SALE</h3>
              <p className="mb-3">Jackpot Days</p>
              <p>
                13<sup>th</sup> - 15<sup>th</sup> AUG
              </p>
            </div>
          </div> */}
        </div>

        <div className="right_arrow_outer">
          <div className="arrow_inner">
            <LuArrowRight />
          </div>
        </div>
      </div>

      <div className="homepage_product_card my-5">
        {homepagecard?.map((el, ind) => {
          return <HomepageCard key={ind} name={el.name} text={el.content} />;
        })}
      </div>

      <h1 className="our_latest_products my-4">Our Latest Products</h1>

      <HomepageProducts />
    </div>
    {/* <IsUserAuthentic /> */}
    </>
  );
};

export default HomePage;
