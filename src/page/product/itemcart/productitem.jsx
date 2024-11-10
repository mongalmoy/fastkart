"use client";

import "@/styles/component/itemcart/productitem.css";
import { useContext, useState } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../../../components/context/WrapperContext";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/react-redux/slices/carts/cartSlice";
import { setViewPageItem } from "@/react-redux/slices/viewpage/viewpageSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apis } from "@/lib/constants";

const ProductItem = (props) => {
  const GlobalContext = useContext(AppContext);
  const { toast, loading } = GlobalContext;

  const dispatch = useDispatch();
  const router = useRouter();

  const [size, setSize] = useState("S");

  const handleAddToCart = async () => {
    try {
      loading(true);
      const updateCartRes = await axios.post(
        apis.SERVER_BASE_URL + "api/cart",
        {
          ...props?.item,
          productId: props?.item?.id,
          quantity: 1,
          size: size,
          condition: "add",
        }
      );
      loading(false);

      if (updateCartRes.status === 200) {
        toast?.success(updateCartRes.data?.message);
        router.push("/cart");
      }
    } catch (error) {
      console.log(error);
      toast?.error(error.response?.data?.message);
      if (error.status === 401) {
        router.push("/login");
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="product_item py-2">
      <Image
        src={props?.item?.imageurl}
        alt={props?.item?.name}
        className="product_image"
        style={{ cursor: "pointer" }}
        width={120}
        height={140}
        onClick={() => {
          loading(true);
          dispatch(setViewPageItem(props?.item));
          loading(false);
          router.push(`/viewproduct?id=${props?.item?.id}`);
        }}

        // priority
      />
      <CardContent className="product_name_price_container py-1 flex justify-between">
        <div style={{ width: "70%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="product_name m-0"
          >
            {props?.item?.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="product_price"
          >
            ₹ {props?.item?.price}
          </Typography>
        </div>
        <div className="product_size_and_gender">
          <div className="product_size">
            <Typography variant="p">Size</Typography>
            <select
              name="size"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div className="product_size">
            <Typography variant="p">{props?.item?.gender}</Typography>
          </div>
        </div>
      </CardContent>
      <CardActions className="product_item_footer_buttons">
        <button
          className="page_button_outline"
          onClick={() => {
            loading(true);
            dispatch(setViewPageItem(props?.item));
            loading(false);
            router.push(`/viewproduct?id=${props?.item?.id}`);
          }}
        >
          View Details
        </button>
        <button
          className="page_button flexbox"
          onClick={async () => {
            await handleAddToCart();
          }}
        >
          <FaShoppingCart className="product_add_to_cart_icon me-1" /> Add to
          Cart
        </button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
