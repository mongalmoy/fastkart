"use client";

import { apis } from "@/lib/constants";
import "@/styles/app/my-account/edit/style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyAccount = () => {
  // const [userInfo, setUserInfo] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const userRes = await axios.get(apis.SERVER_BASE_URL + "api/user");
  //       if (userRes.status === 200) {
  //         setUserInfo(userRes.data);
  //       }
  //     } catch(error) {
  //       console.log(error);
  //       setUserInfo({});
  //     }
  //   })();
  // }, []);

  const userInfo = useSelector(state => state?.user?.userDetails)

  return (
    <div className="edit-account-container">
      <h2 className="edit-account-title">My Account</h2>
      <div className="edit-account-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <h6>{userInfo?.name}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <h6>{userInfo?.dob}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <h6>{userInfo?.email}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <h6>{userInfo?.country}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <h6>{userInfo?.city}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <h6>{userInfo?.contact}</h6>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <h6>{userInfo?.address}</h6>
        </div>
      </div>
    </div>
  )
}

export default MyAccount