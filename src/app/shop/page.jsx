"use client";

import "./shop.css";
import { useContext, useEffect } from "react";
import ProductFilter from "@/components/productfilter/productfilter";
import { AppContext } from "@/components/context/globalcontext";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { ImPower } from "react-icons/im";

export default function Shop() {
  const GlobalContext = useContext(AppContext);

  const cartlist = GlobalContext?.state?.cart?.cartList;

  useEffect(() => {
    GlobalContext?.action?.setCurrentPage("shop");
  }, []);

  return (
    <div className="shop">
      <ProductFilter />
      <div className="product_shopping_page">
        <div className="product-details-container">
          <div className="product_image_add_to_cart">
          <div className="product-image">
            <Image
              src={
                "https://i.pinimg.com/564x/90/e6/66/90e666f2fb541daeb7b7f6601590b65c.jpg"
              }
              alt="Nike x Stussy Tee"
              width={400}
              height={400}
            />
          </div>
          <div className="buy_now_add_to_cart_cont">
            <button className="page_button_outline flexbox"><ImPower className="me-2"/>Buy Now</button>
            <button className="page_button flexbox"><FaShoppingCart className="me-2" />Add to Cart</button>
          </div>
          </div>
          <div className="product_info_container">
            <div className="product-info">
            <h2>Nike x Stussy Tee</h2>
            <div class="ratings mt-2 mb-4">
    <div class="rating-value">
        3.9<span>★</span>
    </div>
    <div class="reviews">
        56,828 Ratings & 4,603 Reviews
    </div>
</div>
            <div className="product-options">
              <label htmlFor="quantity" className="mb-2">
                Products Quantity
              </label>
              <input
                type="number"
                className="mb-2"
                id="quantity"
                // value={quantity}
                min="1"
                // onChange={(e) => setQuantity(e.target.value)}
              />

              <label htmlFor="size">Products Size</label>
              <select
                id="size"
                // value={size}
                // onChange={(e) => setSize(e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="product-price">
              <p>₱0.00</p>
              <button className="page_button" onClick={null}>Add to Cart</button>
            </div>
            </div>

            <div className="product-thumbnails">
              {Array.from({length:3}).map((_,ind) => {
                return(
<div key={ind} className="p-3">
              <Image
                src="https://i.pinimg.com/564x/90/e6/66/90e666f2fb541daeb7b7f6601590b65c.jpg"
                alt="Thumbnail 1"
                width={100}
                height={100}
              />
              </div>
                )
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
