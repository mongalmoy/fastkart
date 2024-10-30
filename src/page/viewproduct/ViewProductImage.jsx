"use client";

import { Skeleton } from "@mui/material";
import Image from "next/image";

const ViewProductImage = ({imgUrl, imgH, imgW, skelH, skelW}) => {
  return (
    imgUrl ? (
      <Image
        src={imgUrl}
        alt="Nike x Stussy Tee"
        width={imgW}
        height={imgH}
        loading="lazy"
      />
    ) : (
      <Skeleton variant="rounded" height={skelH} width={skelW} />
    )
  )
}

export default ViewProductImage