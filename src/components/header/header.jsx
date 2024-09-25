import "@/styles/component/header/header.css";
import { headerLinks } from "@/data/header";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <Link href={"/"}>
        <button className="welcome flexbox">Welcome</button>
      </Link>

      <div className="header_links">
        {headerLinks.map((el, ind) => (
          <Link key={el?.toString() + ind} href={el.link}>
            <button className="header_item">{el.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
