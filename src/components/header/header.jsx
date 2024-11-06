"use client";

import "@/styles/component/header/header.css";
import Link from "next/link";
import { headerLinks } from "@/data/header";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const LazyHeaderCartIcon = dynamic(() => import("./HeaderCartIcon"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="header">
      <Link href={"/"}>
        <button className="welcome flexbox">Fastkart</button>
      </Link>

      <div className="header_links">
        {pathname === "/login" || pathname === "/register"
          ? headerLinks?.map((el, ind) => {
              return el.link === "/cart" && window.innerWidth<600 ? (
                <LazyHeaderCartIcon key={el?.toString() + ind} el={el} />
              ) : (
                <Link
                  key={el?.toString() + ind}
                  href={el.link}
                  className={el.className + "_a"}
                >
                  <button className={el?.className}>
                    {el?.icon}
                    <span>{el?.name}</span>
                  </button>
                </Link>
              );
            })
          : headerLinks
              ?.filter((el) => el.auth)
              .map((el, ind) =>
                el.link === "/cart" && window.innerWidth<600 ? (
                  <LazyHeaderCartIcon key={el?.toString() + ind} el={el} />
                ) : (
                  <Link
                    key={el?.toString() + ind}
                    href={el.link}
                    className={el.className + "_a"}
                  >
                    <button className={el?.className}>
                      {el?.icon}
                      <span>{el?.name}</span>
                    </button>
                  </Link>
                )
              )}
      </div>
    </div>
  );
};

export default Header;
