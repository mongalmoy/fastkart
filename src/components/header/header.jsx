import "@/styles/component/header/header.css";
import Link from "next/link";
import { headerLinks } from "@/data/header";
import dynamic from "next/dynamic";

const LazyHeaderCartIcon = dynamic(() => import("./HeaderCartIcon"), {
  ssr: false,
});

const Header = () => {
  return (
    <div className="header">
      <Link href={"/"}>
        <button className="welcome flexbox">Fastkart</button>
      </Link>

      <div className="header_links">
        {headerLinks.map((el, ind) => (
          <Link
            key={el?.toString() + ind}
            href={el.link}
            className={el.className + "_a"}
          >
            <LazyHeaderCartIcon el={el} />

{/* <button className={el.className}>
                {el.icon}
                {el.showName && el.name}
              </button> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
