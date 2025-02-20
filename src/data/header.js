import { FaShoppingCart } from "react-icons/fa"
import { MdAccountCircle } from "react-icons/md";

export const headerLinks = [
  {name : "Register", showName: true, auth: false, link: "/register", icon: null, className: "header_item"},
  {name : "Go to Cart", showName: true, auth: true, link: "/cart", icon: null, className: "header_item"},
  {name : "My Account", showName: true, auth: true, link: "/my-account", icon: null, className: "header_item"},
  {name : "Login", showName: true, auth: false, link: "/login", icon: null, className: "header_item"},
  {name: "Login", showName: true, auth: false, link: "/login", icon: <MdAccountCircle />, className: "header_item_mini"},
  {name: "Cart", showName: false, auth: true, link: "/cart", icon: <FaShoppingCart />, className: "header_item_mini",}
]