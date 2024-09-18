"use client";

import "./shop.css";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { useSelector } from "react-redux";

export default function Shop() {
  const viewPageItem = useSelector((state) => state?.viewpage?.itemDetails);

  console.log(viewPageItem);

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
              <button className="page_button flexbox">
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
                <input type="number" className="mb-2" id="quantity" min="1" />

                <label htmlFor="size">Products Size</label>
                <select id="size">
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="product-price">
                <p>₱0.00</p>
                <button className="page_button" onClick={null}>
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
