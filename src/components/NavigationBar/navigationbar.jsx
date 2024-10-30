"use client";

import "@/styles/component/navigationbar/navigationbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { navbarLinks } from "@/data/navigationbar/navigationbarData";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { apis } from "@/lib/constants";
import { setCartCount } from "@/react-redux/slices/carts/cartSlice";

const Navigationbar = () => {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state?.cart?.cartCount);

  useEffect(() => {
    (async () => {
      try {
        const countRes = await axios.get(
          apis.SERVER_BASE_URL + "api/cart?action=getCartItems"
        );

        dispatch(setCartCount(countRes.data?.count ? countRes.data?.count : 0));
      } catch (error) {
        console.log(error);
        dispatch(setCartCount(0));
      }
    })();
  }, []);

  return (
    <div className="navigation_bar">
      {/* <div className="app_logo" onClick={() => router.push("/")}>
        <span className="fast_color">Fast</span>Kart
      </div> */}
      <div className="navigation_items">
        {navbarLinks.map((el, ind) => {
          return (
            <Link
              key={ind}
              className={`navigation_item_link ${
                pathname === el?.link ? "active" : ""
              }`}
              href={el?.link}
            >
              {el?.name}
            </Link>
          );
        })}
      </div>
      <div className="search_cart_cont flexbox">
        <button className="page_button search_button me-2">
          <BsSearch />
        </button>
        <Link href={"/cart"}>
          <button className="page_button cart_button flexbox">
            <FaShoppingCart className="me-1" />
            <span className="noOfItems_redIcon">{cartCount}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navigationbar;