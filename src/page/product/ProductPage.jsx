"use client";

import NoResultPage from "@/components/NoResultPage/NoResultPage";
import { Grid, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./productfilter/productfilter";
import FilterOption from "./FilterOption";
import { setProductList } from "@/react-redux/slices/products/productSlice";
import axios from "axios";
import { apis } from "@/lib/constants";
import { AppContext } from "@/components/context/WrapperContext";
import ChipsArray from "./productfilter/ChipsArray";

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

  const { toast, loader, loading } = useContext(AppContext);

  const productList = useSelector((state) => state.product.productList);
  const [products, setProducts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterGender, setFilterGender] = useState([])
  const [showFilter, setShowFilter] = useState(true)

  useEffect(() => {
    (async () => {
      const products = await getProducts();

      if (products.length > 0) {
        setProducts(products);
        dispatch(setProductList(products));
      }
    })();

    const handleResize = () => {
      // setWindowWidth(window.innerWidth);
      if(window.innerWidth<600) {
        setShowFilter(false)
      } else {
        setShowFilter(true)
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log("showFilter", showFilter);
  console.log("products", products);
  console.log("productList", productList);
  console.log("filterCategories", filterCategories);
  console.log("filterGender", filterGender);

  async function getProducts() {
    try {
      loading(true);
      const products = await axios.get(apis.SERVER_BASE_URL + "api/products");
      loading(false);
      return products.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      loading(false);
      return [];
    }
  }

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    const inputValLow = e.target.value?.toLowerCase();

    const filteredProd = productList?.filter((el) => {
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
    setProducts(productList);
  };

  const handleFilter = (val) => {
    console.log(val);
    const item = val.replace(/^./, val[0].toUpperCase());

    let newFilterCat = []
    if(filterCategories.indexOf(item)>=0) {
      newFilterCat = [...filterCategories];
    }else {
      newFilterCat = [...filterCategories, item];
    }
    
    handleSetProducts(newFilterCat, filterGender);
  };

  const handleFilterByGender = (val) => {
    // const filteredProd = productList?.filter((el) => {
    //   if (el?.gender?.toLowerCase()?.includes(val)) {
    //     return el;
    //   }
    // });
    // setProducts(filteredProd);

    //==========================================================

    console.log(val);
    const item = val.replace(/^./, val[0].toUpperCase());

    let newFilterGen = []
    if(filterGender.indexOf(item)>=0) {
      newFilterGen = [...filterGender];
    }else {
      newFilterGen = [...filterGender, item];
    }

    handleSetProducts(filterCategories, newFilterGen);
  };

  const clearProductCategories = (type, label) => {
    // console.log("label to delete", label)

    let newFilterCat = type==="gender" ? filterCategories : filterCategories?.filter(el => el!==label)
    let newFilterGen = type==="gender" ? filterGender?.filter(el => el!==label) : filterGender

    handleSetProducts(newFilterCat, newFilterGen);
  };

  const handleSetProducts = (newFilterCat, newFilterGen) => {
    // console.log(newFilterCat, newFilterGen)
    // console.log(newFilterCat.length, newFilterGen.length)
    if(newFilterCat.length===0 && newFilterGen.length===0) {
      console.log("1st Condition", productList)
      setProducts(productList)
      setFilterCategories([])
      setFilterGender([])
    } else if(newFilterCat.length>0 && newFilterGen.length===0) {
      setFilterCategories(newFilterCat)
      setFilterGender([])
      const newProducts = productList?.filter((el) => {
        if (newFilterCat.includes(el?.type)) {
          return el;
        }
      })
      // console.log("2nd Condition", newProducts)
      setProducts(newProducts)
    } else if(newFilterCat.length===0 && newFilterGen.length>0) {
      setFilterCategories([])
      setFilterGender(newFilterGen)
      const newProducts = productList?.filter((el) => {
        if (newFilterGen.includes(el?.gender)) {
          return el;
        }
      })
      // console.log("3rd Condition", newProducts)
      setProducts(newProducts)
    } else {
      setFilterCategories(newFilterCat)
      setFilterGender(newFilterGen)
      const newProducts = productList?.filter((el) => {
        if (newFilterCat.includes(el?.type) && newFilterGen.includes(el?.gender)) {
          return el;
        }
      })
      // console.log("4th Condition", newProducts)
      setProducts(newProducts)
    }
  }

  // console.log("products", products);

  return (
    <section className="product_page">
      <FilterOption showFilter={showFilter} setShowFilter={setShowFilter} />
      <div className="product_page_inner">
        {showFilter ? <div className="product_category">
          <ProductFilter
            inputText={inputText}
            handleInputChange={handleInputChange}
            handleEraseInput={handleEraseInput}
            handleFilter={handleFilter}
            handleFilterByGender={handleFilterByGender}
            filterCategories={filterCategories}
          />
          {filterCategories?.length ? (
            <ChipsArray
              type="product_type"
              categories={filterCategories}
              clearProductCategories={clearProductCategories}
            />
          ) : null}
          {filterGender?.length ? (
            <ChipsArray
              type="gender"
              categories={filterGender}
              clearProductCategories={clearProductCategories}
            />
          ) : null}
        </div> : null}

        <div className="products_container">
          {products?.length > 0 ? (
            <Grid container spacing={2} style={{ marginTop: 0 }}>
              {products?.map((el, ind) => {
                // console.log(ind + ". el", el)
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
