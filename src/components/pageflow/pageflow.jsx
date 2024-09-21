"use client";

import { useEffect, useState } from "react";
import "@/styles/component/pageflow/pageflow.css";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumbs, Link } from "@mui/material";

const Pageflow = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [pageflowArr, setPageflowArr] = useState([]);

  useEffect(() => {
    const arr = pathname.split("/");
    arr[0] = "home";
    setPageflowArr(arr);
  }, []);

  const handleClickOnLink = (ind) => {
    if (ind == 0) router.push("/");
    else {
      const path = pageflowArr
        .splice(1, ind)
        ?.reduce((path, el) => (path += "/" + el), "");
      router.push(path);
    }
  };

  return (
    <div className="pageflow_container">
      <div className="pageflow_content">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {pageflowArr.map((el, ind) => (
            <Link
              key={ind}
              className="cursor-pointer"
              underline="hover"
              onClick={() => handleClickOnLink(ind)}
            >
              {el}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Pageflow;
