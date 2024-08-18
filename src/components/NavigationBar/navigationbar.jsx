"use client";

import React, { useContext, useState } from "react";
import "./navigationbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { navbarLinks } from "@/data/navigationbar/navigationbarData";
import { AppContext } from "../context/globalcontext";

const Navigationbar = () => {
  const GlobalContext = useContext(AppContext);

  const cartlist = GlobalContext?.state?.cart?.cartList;

  const [navbarLink, setNavbarLink] = useState(navbarLinks);

  console.log("navbarLink", navbarLink);

  return (
    <div className="navigation_bar">
      <div className="app_logo">
        <span className="fast_color">Fast</span>Kart
      </div>
      <div className="navigation_items">
        {navbarLink.map((el, ind) => {
          return (
            <Link
              key={ind}
              className={`navigation_item_link ${el?.active ? "active" : ""}`}
              href={el?.link}
              onClick={() => {
                setNavbarLink((prev) => {
                  const newList = prev.map((el, index) =>
                    ind === index
                      ? { ...el, active: true }
                      : { ...el, active: false }
                  );
                  return newList;
                });
              }}
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
        <button className="page_button cart_button flexbox">
          <FaShoppingCart className="me-1" />
          {cartlist?.reduce(
            (total, el) => (total += Number(el?.quantity)),
            0
          )}{" "}
          Items in your Cart
        </button>
      </div>
    </div>
  );
};

export default Navigationbar;
