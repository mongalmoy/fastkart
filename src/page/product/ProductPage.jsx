"use client";

import NoResultPage from "@/components/NoResultPage/NoResultPage";
import { Grid, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductFilter from "./productfilter/productfilter";
import FilterOption from "./FilterOption";
import { setProductList } from "@/react-redux/slices/products/productSlice";
import axios from "axios";
import { apis } from "@/lib/constants";

const LazyProductItem = dynamic(
  () => import("@/page/product/itemcart/productitem"),
  {
    loading: () => (
      <>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={240}
          className="mb-2"
        />
        <Skeleton variant="rectangular" width={"100%"} height={50} />
      </>
    ),
    ssr: false,
  }
);

const ProductPage = () => {
  console.log("This is product page.............");
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    (async () => {
      const products = await getProducts();
      setProducts(products);

      if(products) {
        dispatch(setProductList(products));
      }
    })()
  }, [])

  async function getProducts() {
    try {
      const products = await axios.get(apis.SERVER_BASE_URL + "api/products");
      return products.data;
    } catch(error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    const inputValLow = e.target.value?.toLowerCase();

    const filteredProd = products?.filter((el) => {
      if (
        el?.color?.toLowerCase()?.includes(inputValLow) ||
        el?.gender?.toLowerCase()?.includes(inputValLow) ||
        el?.name?.toLowerCase()?.includes(inputValLow) ||
        el?.type?.toLowerCase()?.includes(inputValLow)
      ) {
        return el;
      }
    });

    setInputText(inputVal);
    setProducts(filteredProd);
  };

  const handleEraseInput = () => {
    setInputText("");
    setProducts(products);
  };

  const handleFilter = (val) => {
    const filteredProd = products?.filter((el) => {
      if (el?.type?.toLowerCase()?.includes(val)) {
        return el;
      }
    });
    setProducts(filteredProd);
  };

  const handleFilterByGender = (val) => {
    const filteredProd = products?.filter((el) => {
      if (el?.gender?.toLowerCase()?.includes(val)) {
        return el;
      }
    });
    setProducts(filteredProd);
  };

  // console.log("products", products);

  return (
    <section className="product_page">
      <FilterOption />
      <div className="product_page_inner">
        <ProductFilter
          inputText={inputText}
          handleInputChange={handleInputChange}
          handleEraseInput={handleEraseInput}
          handleFilter={handleFilter}
          handleFilterByGender={handleFilterByGender}
        />
        <div className="products_container">
          {products?.length > 0 ? (
            <Grid container spacing={2} style={{ marginTop: 0 }}>
              {products?.map((el, ind) => {
                console.log(ind + ". el", el)
                return (
                  <Grid
                    key={el?.toString() + ind}
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    style={{
                      marginTop: 0,
                      paddingTop: 0,
                      marginBottom: "24px",
                    }}
                  >
                    <LazyProductItem
                      item={el}
                      id={el?.id}
                      imgUrl={el?.imageurl}
                      name={el?.name}
                      price={el?.price}
                      type={el?.type}
                      currency={el?.currency}
                      color={el?.color}
                      gender={el?.gender}
                      quantity={el?.quantity}
                      description={el?.description}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <NoResultPage />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
