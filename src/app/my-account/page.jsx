"use client";

import { AppContext } from "@/components/context/WrapperContext";
import "@/styles/app/my-account/edit/style.css";
import { Skeleton } from "@mui/material";
import { useContext } from "react";
import { useSelector } from "react-redux";

const CustomSkeleton = <Skeleton animation="wave" style={{ width: "50%" }} />;

const MyAccount = () => {
  const {loader} = useContext(AppContext)

  const userInfo = useSelector((state) => state?.user?.userDetails);

  return (
    <div className="edit-account-container">
      <h2 className="edit-account-title">My Account</h2>
      <div className="edit-account-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          {!loader ? <h6>{userInfo?.name}</h6> : CustomSkeleton}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          {!loader ? <h6>{userInfo?.dob}</h6> : CustomSkeleton}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          {!loader ? <h6>{userInfo?.email}</h6> : CustomSkeleton}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          {!loader ? <h6>{userInfo?.country}</h6> : CustomSkeleton}
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          {!loader ? <h6>{userInfo?.city}</h6> : CustomSkeleton}
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          {!loader ? <h6>{userInfo?.contact}</h6> : CustomSkeleton}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          {!loader ? <h6>{userInfo?.address}</h6> : CustomSkeleton}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
