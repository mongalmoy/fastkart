import React from 'react';
import './navigationbar.css';
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const Navigationbar = () => {
  return (
    <div className='navigation_bar'>
      <div className="app_logo">
        <span className='fast_color'>Fast</span>Kart
      </div>
      <div className="navigation_items">
        <a className="navigation_item_link">Home</a>
        <a className="navigation_item_link">Shopping Cart</a>
        {/* <div className="navigation_item_link"></div> */}
      </div>
      <div className="search_cart_cont flexbox">
        <button className="page_button search_button me-2">
          <BsSearch />
        </button>
        <button className="page_button cart_button flexbox">
          <FaShoppingCart className='me-1' />
          4 Items in your Cart
        </button>
      </div>
    </div>
  )
}

export default Navigationbar