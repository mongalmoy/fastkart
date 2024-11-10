"use client";

import "@/styles/app/cart/cart.css";
import OrderSummery from "@/page/cart/ordersummery";
import ShoppingCart from "@/page/cart/shoppingcart";
import { Alert, AlertTitle, Button, Grid } from "@mui/material";
// import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { apis } from "@/lib/constants";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartCount } from "@/react-redux/slices/carts/cartSlice";
import { AppContext } from "@/components/context/WrapperContext";

export async function getCartList() {
  console.log("getcartlist");
  try {
    const result = await axios.get(apis.SERVER_BASE_URL + "api/cart", {
      withCredentials: true,
    });
    console.log("result-->", result);
    return result?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function Cart() {
  const dispatch = useDispatch();

  const {toast, loader, loading} = useContext(AppContext)

  const [userCart, setUserCart] = useState([])
  const [cartList, setCartList] = useState([]);
  // const [loader, loading] = useState(false);


  /********************** useRef starts***************************/
  const cartListRef = useRef([]);
  /********************** useRef ends ***************************/

  console.log("cartList", cartList)

  useEffect(() => {
    (async () => {
      await onLoad();
    })()
  }, []);

  const onLoad = async () => {
    loading(true)
    const userCart = await getCartList()

    console.log("userCart--->", userCart)
    cartListRef.current = userCart?.map((el) => ({ ...el, isChecked: false }))

    setUserCart(userCart)

    Promise.all(userCart?.map(async (el) => {
      try {
        const productItem = await axios.post(apis.SERVER_BASE_URL + "api/products", {productId: el?.product_id});
        // console.log("productItem", productItem)
        
        return {...productItem.data, quantity: el?.product_quantity, size: el?.product_size};
      } catch(error) {
        console.log(error);
        return {};
      }
    })).then((data) => {
      const totalCnt = data?.reduce((tot, el) => tot += el?.quantity, 0)
      dispatch(setCartCount(totalCnt))
      setCartList(data);
      loading(false)
    }).finally(() => {
      loading(false)
    })
  }

  
  return (
    <div className="cart">
      {cartList?.length === 0 && loader===false ? (
        <div>
          <Alert severity="warning" className="cart_empty_alert mb-5">
            <AlertTitle>Your basket is empty</AlertTitle>
            {`To continue with your purchase, please ensure that you've added at
            least one item to your cart.`}
          </Alert>

          <Link href={"/product"}>
            <Button
              className="cart_empty_btn"
              role={undefined}
              variant="contained"
              startIcon={<FaPlus />}
            >
              Add Products
            </Button>
          </Link>
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} className="p-0 w-full">
            <ShoppingCart cartList={cartList} userCart={userCart} setCartList={setCartList} cartListRef={cartListRef} onLoad={onLoad} />
          </Grid>
          <Grid item lg={4} md={4} sm={12} className="cart_summery_div">
            <OrderSummery cartList={cartList} userCart={userCart} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Cart;
