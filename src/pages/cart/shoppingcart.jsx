"use client";

import {
  alpha,
  Button,
  ButtonGroup,
  Checkbox,
  IconButton,
  Paper,
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
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/components/context/globalcontext";

const ShoppingCart = () => {

  const GlobalContext = useContext(AppContext);

  console.log(GlobalContext);

  const cartlist = GlobalContext?.state?.cart?.cartList;

  console.log("cartlist", cartlist);

  const subTotal = cartlist?.reduce((total, el) => total+=(el.price * el.quantity), 0)
  const gst = subTotal * 0.12;
  const handlingFees = 50;



  const [cartData, setCartData] = useState([]);
  const [numSelected, setNumSelected] = useState([1]);

  return (
    <div className="shopping_cart_container">
      <h1 className="shopping_cart_heading">Shopping Cart</h1>
      <p className="cart_text">You currently have 3 item(s) in your cart</p>

      {/* <Paper sx={{ width: "100%" }}> */}
      {numSelected.length ? (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected.length > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
          className="mt-4"
        >
          {numSelected.length > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected.length} selected
            </Typography>
          ) : null}

          {numSelected.length > 0 ? (
            <Tooltip title="Delete">
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
                  <TableCell align="left">
                    <Image
                      src={el?.imageURL}
                      alt={el?.name}
                      width={40}
                      height={40}
                    />
                  </TableCell>
                  <TableCell align="left">{el?.name}</TableCell>
                  <TableCell align="left">{el?.quantity}</TableCell>
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
              <TableCell align="left">
                <Typography color={"#000"} fontSize={17} variant="subtitle2">
                  {"₹  "}
                  {cartlist.reduce(
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
      {/* </Paper> */}
    </div>
  );
};

export default ShoppingCart;
