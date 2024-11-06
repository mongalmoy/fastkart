"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const HeaderCartIcon = ({el}) => {
  const count = useSelector((state) => state?.cart?.cartCount);
  return (
    <Link
      href={el.link}
      className={el.className + "_a"}
    >
      <button className={el?.className}>
        {el?.icon}
        <span>{count}</span>
      </button>
    </Link>
  );
};

export default HeaderCartIcon;
