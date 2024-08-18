"use client";

import React, { useEffect, useState } from "react";
import "./pageflow.css";
import { usePathname } from "next/navigation";
import { Breadcrumbs, Link } from "@mui/material";
// import { useRouter } from 'next/router';

const Pageflow = () => {
  // const router = useRouter();
  const [pageflowArr, setPageflowArr] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const arr = pathname.split("/")
    arr[0] = "home"
    setPageflowArr(arr);
  }, []);

  console.log(pageflowArr);

  return (
    <div className="pageflow_container">
      <div className="pageflow_content">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {pageflowArr.map((el, ind) => (
            <Link key={ind} href="#" underline="hover">
              {el}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Pageflow;
