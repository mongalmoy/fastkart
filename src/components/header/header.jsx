"use client";

import "@/styles/component/header/header.css";
import Link from "next/link";
import { headerLinks } from "@/data/header";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LazyHeaderCartIcon = dynamic(() => import("./HeaderCartIcon"), {
  ssr: false,
});

const Header = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined to prevent SSR errors
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 600);
      };

      handleResize(); // Set initial state based on current width
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="header">
      <Link href={"/"}>
        <button className="welcome flexbox">Fastkart</button>
      </Link>

      <div className="header_links">
        {pathname === "/login" || pathname === "/register"
          ? headerLinks?.map((el, ind) => {
              return el.link === "/cart" && isMobile ? (
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
                el.link === "/cart" && isMobile ? (
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
