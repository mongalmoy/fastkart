import { apis } from "@/lib/constants";
import { Skeleton } from "@mui/material";
import axios from "axios";
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

async function getProducts() {
  try {
    const products = await axios.get(apis.SERVER_BASE_URL + "api/products");
    // console.log("productsListUi------>", products)
    return products.data;
  } catch(error) {
    console.error("Error fetching products:", error);
    return [];
  }
  
}

const Product = async () => {
  const products = await getProducts();
  return <LazyProductPage productList={products} />
};

export default Product;
