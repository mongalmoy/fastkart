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
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/components/context/WrapperContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemToCart,
} from "@/react-redux/slices/carts/cartSlice";
import { useRouter } from "next/navigation";
// import { Popconfirm } from "antd";

const ShoppingCart = () => {
  const GlobalContext = useContext(AppContext);

  const dispatch = useDispatch();
  const router = useRouter();

  const action = GlobalContext?.action;
  const toast = GlobalContext?.toast;

  const cartList = useSelector((state) => state?.cart?.cartList);

  // /********************** useState starts***************************/
  const [showDelBtn, setShowDelBtn] = useState(false);
  // /********************** useState ends ***************************/

  /********************** useRef starts***************************/
  const cartListRef = useRef(
    cartList?.map((el) => ({ id: el?.id, isChecked: false }))
  );
  /********************** useRef ends ***************************/

  console.log(cartListRef.current);

  const totalCartItems = cartList?.reduce(
    (total, el) => (total += Number(el?.quantity)),
    0
  );

  const deleteCartItems = () => {
    const itemIdList = cartList
      ?.filter((el) => el?.isChecked == true)
      ?.map((el) => el?.id);
    action?.deleteCartItems(itemIdList);

    const delArr = cartListRef.current?.map((el) => el?.id);

    const itemsToDelete = cartList
      ?.filter((el) => delArr?.includes(el?.id))
      ?.map((el) => ({ id: el?.id, count: el?.quantity }));

    console.log("itemsToDelete", itemsToDelete)

    dispatch(removeItemToCart(itemsToDelete));
    cartListRef.current = cartListRef.current?.filter(el => !el?.isChecked)
    toast?.success("Items lists deleted from your cart");
  };

  const handleChangeInput = (itemId) => {
    cartListRef.current?.forEach((el) =>
      el?.id === itemId ? (el.isChecked = !el?.isChecked) : null
    );
    setShowDelBtn(
      cartListRef.current?.reduce(
        (tot, el) => (tot += el?.isChecked ? 1 : 0),
        0
      ) > 0
    );
  };
  console.log("cartListRef", cartListRef);

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

      <TableContainer>
        <Table aria-labelledby="tableTitle" size={"medium"}>
          <TableHead>
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
          <TableBody>
            {cartList?.map((el, index) => {
              return (
                <TableRow
                  key={index}
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
                      // onClick={() => selectItem(el?.id)}
                      onChange={() => handleChangeInput(el?.id)}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Image
                      src={el?.imageURL}
                      alt={el?.name}
                      width={40}
                      height={40}
                    />
                  </TableCell>
                  <TableCell align="left">{el?.name}</TableCell>
                  <TableCell align="left">
                    <div className="flexbox">
                      <a
                        className="plus_minus_icon_holder"
                        onClick={() => {
                          dispatch(
                            removeItemToCart([{ id: el?.id, count: 1 }])
                          );
                          toast?.success("One item reduced to cart");
                        }}
                      >
                        <RemoveIcon fontSize="10" />
                      </a>
                      <span className="mx-3">{el?.quantity}</span>
                      <a
                        className="plus_minus_icon_holder"
                        onClick={() => {
                          dispatch(
                            addItemToCart({
                              item: el,
                              itemCnt: 1,
                            })
                          );
                          toast?.success("One more item added to cart");
                          router.push("/cart");
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
          <TableFooter>
            <TableRow>
              <TableCell align="left">
                <Typography color={"#000"} fontSize={17} variant="subtitle2">
                  Total
                </Typography>
              </TableCell>
              {Array.from({ length: 4 }).map((el) => (
                <TableCell key={el?.toString()}></TableCell>
              ))}
              <TableCell align="left">
                <Typography color={"#000"} fontSize={17} variant="subtitle2">
                  {"₹  "}
                  {cartList?.reduce(
                    (total, el) =>
                      (total += Number(el?.price) * Number(el?.quantity)),
                    0
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <ButtonGroup
        className="align_right mt-4"
        variant="outlined"
        aria-label="Loading button group"
        size="small"
      >
        <Button>
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button variant="contained">Proceed Checkout</Button>
        {/* <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />}>
          Save
        </LoadingButton> */}
      </ButtonGroup>
    </div>
  );
};

export default ShoppingCart;
