import "@/styles/component/header/header.css";
import Link from "next/link";
import { headerLinks } from "@/data/header";
import dynamic from "next/dynamic";
import IsUserAuthentic from "../../utils/isUserAuthentic";

const LazyHeaderLinkItem = dynamic(() => import("./HeaderLinkItem"), {
  ssr: false,
});

const Header = () => {
  return (
    <>
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
              {/* {el?.link === "/cart" ? (
                <LazyHeaderCartIcon el={el} />
              ) : (
                <button className={el.className}>
                  {el.icon}
                  {el.showName && el.name}
                </button>
              )} */}
              <LazyHeaderLinkItem el={el} />
            </Link>
          ))}
        </div>
      </div>
      <IsUserAuthentic />
    </>
  );
};

export default Header;
