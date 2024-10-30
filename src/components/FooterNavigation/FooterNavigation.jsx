import "@/styles/component/FooterNavigation/FooterNavigation.css";
import { HiOutlineHome } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";

const FooterNavLinks = [
  { name: "Home", icon: <HiOutlineHome />, href: "/" },
  { name: "Products", icon: <MdOutlineExplore />, href: "/product" },
  { name: "Account", icon: <VscAccount />, href: "/my-account" },
  { name: "Cart", icon: <BsCart3 />, href: "/cart" },
];

export default function FooterNavigation() {
  return (
    <nav className="mobile_navigation">
      <ul>
        {FooterNavLinks.map(el => {
          return <li key={el.name.toString()}>
            <Link href={el.href}>
              {el.icon}
              <span>{el.name}</span>
            </Link>
          </li>
        })}
      </ul>
    </nav>
  );
}
