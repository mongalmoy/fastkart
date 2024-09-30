"use client";

import { useSelector } from "react-redux";

const HeaderCartIcon = ({ className, icon }) => {
  const cartlist = useSelector((state) => state?.cart?.cartList);
  return (
    <button className={className}>
      {icon}
      <span>
        {cartlist?.reduce((total, el) => (total += Number(el?.quantity)), 0)}
      </span>
    </button>
  );
};

export default HeaderCartIcon;
