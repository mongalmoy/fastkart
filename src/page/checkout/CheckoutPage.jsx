"use client";

import "@/styles/page/checkout/CheckoutPage.css";
import { validateCheckoutPage } from "@/utils/validations/checkoutPageValidation";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import { AppContext } from "@/components/context/WrapperContext";
import axios from "axios";
import { apis } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { toast, loading } = useContext(AppContext);
  const checkoutList = useSelector((state) => state?.checkout?.data);
  const router = useRouter();

  console.log("checkoutList", checkoutList);

  const formSchema = {
    addressDetials: {
      fullName: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
    },
    cardDetails: {
      cardNo: "",
      expDate: "",
      cvv: "",
    },
  };
  const [formInfo, setFormInfo] = useState({
    addressDetials: {
      fullName: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
    },
    cardDetails: {
      cardNo: "",
      expDate: "",
      cvv: "",
    },
  });

  const [errors, setErrors] = useState({
    addressDetials: {
      fullName: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
    },
    cardDetails: {
      cardNo: "",
      expDate: "",
      cvv: "",
    },
  });
  const [orderSummery, setOrderSummery] = useState({
    subTotal: 0,
    shippingFees: 50,
    gst: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    if(checkoutList?.length===0) {
      router.push("/cart")
    }
    setOrderSummery((prevSummery) => {
      prevSummery.subTotal = checkoutList?.reduce(
        (tot, el) => (tot += Number(el?.price) * Number(el?.quantity)),
        0
      );
      prevSummery.gst = prevSummery.subTotal * 0.12;
      prevSummery.orderTotal =
        prevSummery.subTotal + prevSummery.shippingFees + prevSummery.gst;
      return { ...prevSummery };
    });
  }, [checkoutList, router]);

  const handleInputChange = (key, e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(value?.length, formInfo?.[key]?.[name]?.length);
    setFormInfo((prev) => {
      if (name === "expDate") {
        if (
          value?.length > prev?.[key]?.[name]?.length &&
          value?.length === 2
        ) {
          prev[key][name] = value + "/";
          console.log(1);
        } else if (
          prev?.[key]?.[name]?.length > value?.length &&
          value?.length === 3
        ) {
          prev[key][name] = value?.slice(0, 2);
          console.log(2);
        } else {
          prev[key][name] = value;
          console.log(3);
        }
      } else prev[key][name] = value;
      return { ...prev };
    });
    setErrors((prev) => {
      if (value) prev[key][name] = "";
      return { ...prev };
    });
  };

  console.log("formInfo", formInfo);
  console.log("errors", errors);

  const handleCheckout = async (e) => {
    e.preventDefault();
    validateCheckoutPage({ formInfo, formSchema, setErrors })
      .then(async() => {
        console.log("hello")
        try {
          loading(true)
          const updateOrdersRes = await axios.post(apis.SERVER_BASE_URL + "api/orders", {
            checkoutList: checkoutList,
            billingAddress: formInfo?.addressDetials,
            paymentDetails: formInfo?.cardDetails,
            orderSummery: orderSummery,
            orderdate: new Date().toISOString().slice(0, 10),
            paymentFlag: "D"
          })
          loading(false)

          if(updateOrdersRes.status===201) {
            toast?.success(updateOrdersRes?.data?.message);
            router.push("/");
          }
        } catch(error) {
          toast?.error(error?.response?.data?.message)
        }
      })
      .catch((error) => {
        console.log(error)
        toast?.error(error);
      });
  };

  return (
    <div className="checkout-page">
      <form className="checkout-container" onSubmit={handleCheckout}>
        <h2 className="checkout-title">Checkout</h2>

        {/* Cart Item Section */}
        {checkoutList?.map((el, ind) => {
          return <CheckoutItem key={ind} item={el} />;
        })}

        {/* Billing Address and Card Details Section */}
        <div className="checkout-sections">
          {/* Billing Address */}
          <div className="billing-address">
            <h3 className="billing-title">Billing Address</h3>
            <div className="billing-form">
              <div
                className={
                  errors.addressDetials.fullName
                    ? "form-group error"
                    : "form-group"
                }
              >
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  placeholder="John Doe"
                  maxLength={48}
                  value={formInfo.addressDetials.fullName}
                  onChange={(e) => handleInputChange("addressDetials", e)}
                />
                {errors.addressDetials.fullName ? (
                  <p className="error-msg">{errors.addressDetials.fullName}</p>
                ) : null}
              </div>
              <div
                className={
                  errors.addressDetials.address
                    ? "form-group error"
                    : "form-group"
                }
              >
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Street Name"
                  maxLength={250}
                  value={formInfo.addressDetials.address}
                  onChange={(e) => handleInputChange("addressDetials", e)}
                />
                {errors.addressDetials.address ? (
                  <p className="error-msg">{errors.addressDetials.address}</p>
                ) : null}
              </div>
              <div
                className={
                  errors.addressDetials.city ? "form-group error" : "form-group"
                }
              >
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  maxLength={20}
                  value={formInfo.addressDetials.city}
                  onChange={(e) => handleInputChange("addressDetials", e)}
                />
                {errors.addressDetials.city ? (
                  <p className="error-msg">{errors.addressDetials.city}</p>
                ) : null}
              </div>
              <div
                className={
                  errors.addressDetials.pincode
                    ? "form-group error"
                    : "form-group"
                }
              >
                <label htmlFor="zip">Zip Code</label>
                <input
                  type="text"
                  id="zip"
                  name="pincode"
                  placeholder="123456"
                  maxLength={6}
                  value={formInfo.addressDetials.pincode}
                  onChange={(e) => handleInputChange("addressDetials", e)}
                />
                {errors.addressDetials.pincode ? (
                  <p className="error-msg">{errors.addressDetials.pincode}</p>
                ) : null}
              </div>
              <div
                className={
                  errors.addressDetials.country
                    ? "form-group error"
                    : "form-group"
                }
              >
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  maxLength={20}
                  value={formInfo.addressDetials.country}
                  onChange={(e) => handleInputChange("addressDetials", e)}
                />
                {errors.addressDetials.country ? (
                  <p className="error-msg">{errors.addressDetials.country}</p>
                ) : null}
              </div>

              {/* Card Details */}
              <h3 className="card-details-title">Card Details</h3>
              <div
                className={
                  errors.cardDetails.cardNo ? "form-group error" : "form-group"
                }
              >
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  name="cardNo"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  maxLength={16}
                  value={formInfo.cardDetails.cardNo}
                  onChange={(e) => handleInputChange("cardDetails", e)}
                />
                {errors.cardDetails.cardNo ? (
                  <p className="error-msg">{errors.cardDetails.cardNo}</p>
                ) : null}
              </div>
              <div className="form-group-inline">
                <div
                  className={
                    errors.cardDetails.expDate
                      ? "form-group error"
                      : "form-group"
                  }
                >
                  <label htmlFor="expiry-date">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry-date"
                    name="expDate"
                    placeholder="MM/YYYY"
                    maxLength={7}
                    value={formInfo.cardDetails.expDate}
                    onChange={(e) => handleInputChange("cardDetails", e)}
                  />
                  {errors.cardDetails.expDate ? (
                    <p className="error-msg">{errors.cardDetails.expDate}</p>
                  ) : null}
                </div>
                <div
                  className={
                    errors.cardDetails.cvv ? "form-group error" : "form-group"
                  }
                >
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    maxLength={3}
                    value={formInfo.cardDetails.cvv}
                    onChange={(e) => handleInputChange("cardDetails", e)}
                  />
                  {errors.cardDetails.cvv ? (
                    <p className="error-msg">{errors.cardDetails.cvv}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span>Order Sub-total:</span>
                <span>₹ {orderSummery.subTotal}</span>
              </div>
              <div className="summary-item">
                <span>Shipping & Handling:</span>
                <span>₹ {orderSummery.shippingFees}</span>
              </div>
              <div className="summary-item">
                <span>GST (12%):</span>
                <span>₹ {orderSummery.gst}</span>
              </div>
              <div className="summary-total">
                <span>Order Total:</span>
                <span>₹ {orderSummery.orderTotal}</span>
              </div>
            </div>
          </div>
        </div>

        <button className="checkout-btn" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}
