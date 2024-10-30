"use client";

import "@/styles/app/viewproduct/shop.css";
import { FaShoppingCart } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/context/WrapperContext";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { apis } from "@/lib/constants";

const LazyViewProductImage = lazy(
  () => import("@/page/viewproduct/ViewProductImage"),
  {
    ssr: false,
  }
);

export default function ViewProduct() {
  const GlobalContext = useContext(AppContext);
  const toast = GlobalContext?.toast;

  const router = useRouter();
  const params = useSearchParams();

  const productId = params?.get("id");

  const [viewPageItem, setViewPageItem] = useState({
    id: "",
    price: "",
    imageurl: "",
  });
  const [productDetails, setProductDetails] = useState({
    quantity: 1,
    size: "M",
  });
  const [error, setError] = useState({ quantity: "", size: "" });

  const totalPrice = (
    Number(viewPageItem?.price || 0) * Number(productDetails?.quantity || 1)
  ).toFixed(2);

  useEffect(() => {
    if (productId) fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      const productItemRes = await axios.post(
        `${apis.SERVER_BASE_URL}api/products`,
        { productId }
      );
      setViewPageItem(productItemRes.data);
    } catch (error) {
      toast?.error(error?.response?.data?.message || "Error fetching product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "quantity" && (value < 1 || value > 5)) {
      setError((prev) => ({
        ...prev,
        quantity: "No of products should be between 1 to 5",
      }));
    } else {
      setError((prev) => ({ ...prev, quantity: "" }));
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (productDetails?.quantity >= 1 && productDetails?.quantity <= 5) {
      setError((prev) => ({ ...prev, quantity: "" }));
      await handleAddItemToCart();
    } else {
      setError((prev) => ({
        ...prev,
        quantity: "No of products should be between 1 to 5",
      }));
    }
  };

  async function handleAddItemToCart() {
    try {
      const updateCartRes = await axios.post(
        `${apis.SERVER_BASE_URL}api/cart`,
        {
          ...productDetails,
          productId: viewPageItem?.id,
          condition: "add",
        }
      );
      toast?.success(updateCartRes.data?.message);
      router.push("/cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast?.error(error?.response?.data?.message || "Failed to add product");
      if (error?.response?.status === 401) {
        router.push("/login");
      }
    }
  }

  return (
    <Suspense fallback={<div>View Product page is loading...</div>}>
      <div className="shop">
      {/* <ProductFilter /> */}
      <div className="product_shopping_page">
        <div className="product-details-container">
          <div className="product_image_add_to_cart">
            <div className="product-image">
              <LazyViewProductImage
                imgUrl={viewPageItem?.imageurl}
                imgH={400}
                imgW={400}
                skelH={300}
                skelW={400}
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
              <form onSubmit={handleProductSubmit}>
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
                    value={productDetails?.quantity || ""}
                    onChange={handleChange}
                  />
                  {error.quantity && (
                    <p className="error_msg">{error.quantity}</p>
                  )}

                  <label htmlFor="size">Products Size</label>
                  <select
                    name="size"
                    id="size"
                    value={productDetails?.size || ""}
                    onChange={handleChange}
                  >
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div className="product-price">
                  <p>₹ {isNaN(totalPrice) ? "0" : totalPrice}</p>
                  <button className="page_button" type="submit">
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>

            <div className="product-thumbnails">
              {Array.from({ length: 3 }).map((_, ind) => {
                return (
                  <div key={ind} className="p-3">
                    <LazyViewProductImage
                      imgUrl={viewPageItem?.imageurl}
                      imgH={100}
                      imgW={100}
                      skelH={100}
                      skelW={100}
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
    </Suspense>
  );
}
