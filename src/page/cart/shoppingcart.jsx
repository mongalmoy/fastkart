"use client";

import {
  alpha,
  Button,
  ButtonGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/components/context/WrapperContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apis } from "@/lib/constants";
import { setCheckoutData } from "@/react-redux/slices/checkout/checkoutSlice";
// import { Popconfirm } from "antd";

const ShoppingCart = ({
  cartList = [],
  userCart = [],
  setCartList,
  cartListRef,
  onLoad,
}) => {
  const GlobalContext = useContext(AppContext);

  const dispatch = useDispatch();
  const router = useRouter();

  // const action = GlobalContext?.action;
  const { toast, loader, loading } = GlobalContext;

  // const cartList = useSelector((state) => state?.cart?.cartList);

  // /********************** useState starts***************************/
  const [showDelBtn, setShowDelBtn] = useState(false);
  // /********************** useState ends ***************************/

  console.log(cartListRef.current);
  console.log("cartList", cartList);

  const totalCartItems = cartList?.reduce(
    (total, el) => (total += Number(el?.quantity)),
    0
  );

  async function handleManageItemToCart(condition, item) {
    try {
      loading(true);
      const updateCartRes = await axios.post(
        apis.SERVER_BASE_URL + "api/cart",
        {
          ...item,
          productId: item?.id,
          quantity: 1,
          condition: condition,
        }
      );
      loading(false);

      if (updateCartRes.status === 200) {
        toast?.success(updateCartRes.data?.message);
        await onLoad();
      }
    } catch (error) {
      console.log(error);
      loading(false);
      toast?.error(error.response?.data?.message);
      if (error.status === 401) {
        router.push("/login");
      }
    }
  }

  const deleteCartItems = async () => {
    try {
      loading(true);
      const deleteRes = await axios.delete(apis.SERVER_BASE_URL + "api/cart", {
        data: cartListRef.current?.filter((el) => el?.isChecked),
      });
      loading(false);

      if (deleteRes.status === 200) {
        toast?.success(deleteRes?.data?.message);
        await onLoad();
      }
    } catch (error) {
      console.log(error);
      loading(false);
      toast?.error(error.response?.data?.message);
    }
  };

  const handleChangeInput = (itemId, size) => {
    cartListRef.current?.forEach((el) =>
      el?.product_id === itemId && el?.product_size === size
        ? (el.isChecked = !el?.isChecked)
        : null
    );

    setShowDelBtn(
      cartListRef.current?.reduce(
        (tot, el) => (tot += el?.isChecked ? 1 : 0),
        0
      ) > 0
    );
  };

  const handleCheckOut = () => {
    const checkoutItems = cartList
      ?.map((el, ind) => {
        const cartId = cartListRef.current?.[ind]?.id;
        return { ...el, cartId: cartId };
      })
      ?.filter((el) => el?.isChecked);
    console.log("checkoutItems", checkoutItems);
    if (checkoutItems.length === 0) {
      toast?.error("Please select atleast one cart item to proceed.");
      return;
    }
    dispatch(setCheckoutData(checkoutItems));
    router.push("/checkout");
  };

  return (
    <div className="shopping_cart_container">
      <h1 className="shopping_cart_heading">Shopping Cart</h1>
      <p className="cart_text">
        You currently have {totalCartItems} item{" "}
        {totalCartItems > 1 ? "(s)" : null} in your cart
      </p>

      {showDelBtn ? (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(showDelBtn > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
          className="mt-4"
        >
          {showDelBtn ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {showDelBtn} selected
            </Typography>
          ) : null}

          {showDelBtn ? (
            <Tooltip title="Delete" onClick={deleteCartItems}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
      ) : null}

      <TableContainer className="shoppingcart_table_container">
        <Table aria-labelledby="simple table" size={"medium"}>
          <TableHead className="shopping_cart_thead">
            <TableRow>
              <TableCell align="left" className="ps-0">
                Item Checkbox
              </TableCell>
              <TableCell align="left" className="ps-0">
                Product Image
              </TableCell>
              <TableCell align="left" className="ps-0">
                Product Name
              </TableCell>
              <TableCell align="left" className="ps-0">
                Product Size
              </TableCell>
              <TableCell align="left" className="ps-0">
                Quantity
              </TableCell>
              <TableCell align="left" className="ps-0">
                Unit Price
              </TableCell>
              <TableCell align="left" className="ps-0">
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="shopping_cart_tbody">
            {cartList?.map((el, index) => {
              return (
                <TableRow
                  key={el?.toString() + index}
                  hover
                  tabIndex={-1}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      color="primary"
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      checked={el?.isChecked}
                      onChange={() => {
                        handleChangeInput(el?.id, el?.size);
                        setCartList((prev) => {
                          prev[index] = {
                            ...prev[index],
                            isChecked: !prev[index]?.isChecked,
                          };
                          return [...prev];
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Image
                      src={el?.imageurl}
                      alt={el?.name}
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  </TableCell>
                  <TableCell align="left">{el?.name}</TableCell>
                  <TableCell align="left">
                    {el?.size === "M"
                      ? "Medium"
                      : el?.size === "S"
                      ? "Small"
                      : el?.size === "L"
                      ? "Large"
                      : "Extra Large"}
                  </TableCell>
                  <TableCell align="left">
                    <div className="flexbox">
                      <a
                        className="plus_minus_icon_holder"
                        onClick={async () => {
                          await handleManageItemToCart("remove", el);
                        }}
                      >
                        <RemoveIcon fontSize="10" />
                      </a>
                      <span className="mx-3">{el?.quantity}</span>
                      <a
                        className="plus_minus_icon_holder"
                        onClick={async () => {
                          await handleManageItemToCart("add", el);
                        }}
                      >
                        <AddIcon fontSize="10" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    {"₹  "}
                    {el?.price}
                  </TableCell>
                  <TableCell align="left">
                    {"₹  "}
                    {Number(el?.price) * Number(el?.quantity)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <ButtonGroup
        className="flex justify-between mt-4 w-full"
        variant="outlined"
        aria-label="Loading button group"
        size="small"
      >
        <div className="totoal_price">
          <label>Totoal:</label>
          <b>
            {" ₹"}
            {cartList?.reduce(
              (total, el) =>
                (total += Number(el?.price) * Number(el?.quantity)),
              0
            )}
          </b>
        </div>
        <div className="shopping_cart_btns">
          <Button>
            <Link href="/">Home</Link>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCheckOut();
            }}
          >
            Checkout
          </Button>
        </div>
      </ButtonGroup>
    </div>
  );
};

export default ShoppingCart;
