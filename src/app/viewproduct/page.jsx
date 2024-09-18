"use client";

import "./shop.css";
import { addItemToCart } from "@/react-redux/slices/carts/cartSlice";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { AppContext } from "@/components/context/WrapperContext";
import { useRouter } from "next/navigation";

export default function Shop() {
  const GlobalContext = useContext(AppContext);
  const toast = GlobalContext?.toast;

  const viewPageItem = useSelector((state) => state?.viewpage?.itemDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(viewPageItem);

  /************* useStates starts *************/
  const [productDetails, setProductDetails] = useState({
    quantity: 0,
    size: "M", // S -> Small, M -> Medium, L -> Large, XL -> Extra Large
  });
  /************* useStates ends ***************/

  console.log(productDetails);

  const handleChange = (e) => {
    setProductDetails((prev) => {
      prev[e.target.name] = e.target.value;
      return { ...prev };
    });
  };

  return (
    <div className="shop">
      {/* <ProductFilter /> */}
      <div className="product_shopping_page">
        <div className="product-details-container">
          <div className="product_image_add_to_cart">
            <div className="product-image">
              <Image
                src={viewPageItem?.imageURL}
                alt="Nike x Stussy Tee"
                width={400}
                height={400}
              />
            </div>
            <div className="buy_now_add_to_cart_cont">
              <button className="page_button_outline flexbox">
                <ImPower className="me-2" />
                Buy Now
              </button>
              <button
                className="page_button flexbox"
                onClick={() => {
                  dispatch(
                    addItemToCart({
                      item: viewPageItem,
                      itemCnt: 1,
                    })
                  );
                  toast?.success("Item added to cart");
                  router.push("/cart");
                }}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product_info_container">
            <div className="product-info">
              <h2>Nike x Stussy Tee</h2>
              <div className="ratings mt-2 mb-4">
                <div className="rating-value">
                  3.9<span>★</span>
                </div>
                <div className="reviews">56,828 Ratings & 4,603 Reviews</div>
              </div>
              <div className="product-options">
                <label htmlFor="quantity" className="mb-2">
                  Products Quantity
                </label>
                <input
                  type="number"
                  className="mb-2"
                  id="quantity"
                  name="quantity"
                  min={1}
                  max={5}
                  value={productDetails.quantity}
                  onChange={handleChange}
                />

                <label htmlFor="size">Products Size</label>
                <select
                  name="size"
                  id="size"
                  value={productDetails.size}
                  onChange={handleChange}
                >
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="product-price">
                <p>
                  ₹{" "}
                  {(
                    Number(viewPageItem?.price) *
                    Number(productDetails.quantity)
                  )?.toFixed(2)}
                </p>
                <button
                  className="page_button"
                  onClick={() => {
                    dispatch(
                      addItemToCart({
                        item: viewPageItem,
                        itemCnt: Number(productDetails.quantity),
                      })
                    );
                    toast?.success("Item added to cart");
                    router.push("/cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="product-thumbnails">
              {Array.from({ length: 3 }).map((_, ind) => {
                return (
                  <div key={ind} className="p-3">
                    <Image
                      src={viewPageItem?.imageURL}
                      alt="Thumbnail 1"
                      width={100}
                      height={100}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="product-extra-info">
          <div className="size-info">
            <h3>Size</h3>
            <ul>
              <li>Small</li>
              <li>Medium</li>
              <li>Large</li>
              <li>XL</li>
            </ul>
          </div>
          <div className="color-info">
            <h3>Available Colors</h3>
            <ul>
              <li>Black</li>
              <li>Red</li>
              <li>Blue</li>
              <li>Rose</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
