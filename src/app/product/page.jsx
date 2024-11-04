import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";

const LazyProductPage = dynamic(() => import("@/page/product/ProductPage"),{
  ssr: false,
  loading: () => (
    <Skeleton
      variant="rectangular"
      width={"100%"}
      height={"100%"}
    />
  )
})

const Product = async () => {
  return <LazyProductPage />
};

export default Product;
