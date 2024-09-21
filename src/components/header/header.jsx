"use client";

import "@/styles/component/header/header.css";
import { useRouter } from "next/navigation";
import { headerLinks } from "@/data/header";

const Header = () => {
  const router = useRouter();

  return (
    <div className="header">
      <button className="welcome flexbox" onClick={() => router.push("/")}>
        Welcome
      </button>
      <div className="header_links">
        {headerLinks.map((el, ind) => (
          <button
            key={el?.toString() + ind}
            className="header_item"
            onClick={() => {
              router.push("/" + el.link);
            }}
          >
            {el.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
