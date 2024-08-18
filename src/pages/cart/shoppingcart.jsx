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
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/components/context/globalcontext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import { Popconfirm } from "antd";

const ShoppingCart = () => {
  const GlobalContext = useContext(AppContext);

  // const cartlist = GlobalContext?.state?.cart?.cartList?.map(el => ({...el, isChecked: false}));
  const action = GlobalContext?.action;
  const toast = GlobalContext?.toast;

  const [cartlist, setCartlist] = useState(
    GlobalContext?.state?.cart?.cartList
  );

  useEffect(() => {
    setCartlist(GlobalContext?.state?.cart?.cartList);
  }, [GlobalContext?.state?.cart?.cartList]);

  console.log("cartlist", cartlist);

  const subTotal = cartlist?.reduce(
    (total, el) => (total += el.price * el.quantity),
    0
  );
  const gst = subTotal * 0.12;
  const handlingFees = 50;

  // const [numSelected, setNumSelected] = useState([1]);

  const totalCartItems = cartlist?.reduce(
    (total, el) => (total += Number(el?.quantity)),
    0
  );

  const numSelected = cartlist?.reduce(
    (total, el) => (total += el?.isChecked ? 1 : 0),
    0
  );

  console.log("numSelected", numSelected);

  const selectItem = (itemid) => {
    setCartlist((prev) => {
      const newList = prev?.map((el) =>
        el?.id === itemid ? { ...el, isChecked: !el?.isChecked } : el
      );
      return newList;
    });
  };

  const deleteCartItems = () => {
    const itemIdList = cartlist?.filter(el => el?.isChecked==true)?.map(el => el?.id)
    action?.deleteCartItems(itemIdList)
  };

  return (
    <div className="shopping_cart_container">
      <h1 className="shopping_cart_heading">Shopping Cart</h1>
      <p className="cart_text">
        You currently have {totalCartItems} item{" "}
        {totalCartItems > 1 ? "(s)" : null} in your cart
      </p>

      {numSelected ? (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
          className="mt-4"
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : null}

          {numSelected > 0 ? (
            // <Popconfirm
            //   title="Delete item from cart"
            //   description="Are you sure to delete these items?"
            //   onConfirm={deleteCartItems}
            //   onCancel={null}
            //   okText="Yes"
            //   cancelText="No"
            // >
              <Tooltip title="Delete" onClick={deleteCartItems}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            // </Popconfirm>
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
            {cartlist?.map((el, index) => {
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
                      checked={el?.isChecked === true ? true : false}
                      onClick={() => selectItem(el?.id)}
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
                          action?.removeItemToCart(el?.id);
                          toast?.successMsg("One item reduced to cart");
                        }}
                      >
                        <RemoveIcon fontSize="10" />
                      </a>
                      <span className="mx-3">{el?.quantity}</span>
                      <a
                        className="plus_minus_icon_holder"
                        onClick={() => {
                          action?.addItemToCart(el?.id);
                          toast?.successMsg("One more item added to cart");
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
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="left">
                <Typography color={"#000"} fontSize={17} variant="subtitle2">
                  {"₹  "}
                  {cartlist?.reduce(
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
