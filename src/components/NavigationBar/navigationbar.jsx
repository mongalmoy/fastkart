"use client";

import "@/styles/component/navigationbar/navigationbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { navbarLinks } from "@/data/navigationbar/navigationbarData";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navigationbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const cartlist = useSelector((state) => state?.cart?.cartList);

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
        <button className="page_button cart_button flexbox">
          <FaShoppingCart className="me-1" />
          <span className="noOfItems_redIcon">
            {cartlist?.reduce(
              (total, el) => (total += Number(el?.quantity)),
              0
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navigationbar;
