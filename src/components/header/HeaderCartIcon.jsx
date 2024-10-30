"use client";

import { useSelector } from "react-redux";

const HeaderCartIcon = (el) => {
  const count = useSelector((state) => state?.cart?.cartCount);
  return (
    <button className={el?.className}>
      {el?.icon}
      <span>
        {el?.name==="cart" ? count : el?.name}
      </span>
    </button>
  );
};

export default HeaderCartIcon;