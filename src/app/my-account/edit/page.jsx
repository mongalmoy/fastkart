"use client";

import { AppContext } from "@/components/context/WrapperContext";
import { apis } from "@/lib/constants";
import "@/styles/app/my-account/edit/style.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const EditAccount = () => {
  const GlobalContext = useContext(AppContext);

  const toast = GlobalContext?.toast;

  const [userInfo, setUserInfo] = useState({
    name: "",
    dob: "",
    email: "",
    country: "",
    city: "",
    contact: "",
    address: "",
  });

  console.log("userInfo", userInfo)

  useEffect(() => {
    (async () => {
      const userRes = await axios.get(apis.SERVER_BASE_URL + "api/user");
      if (userRes.status === 200) {
        setUserInfo((prev) => {
          return {
            ...prev,
            name: userRes.data?.name,
            email: userRes.data?.email,
            dob: userRes.data?.dob,
            country: userRes.data?.country,
            city: userRes.data?.city,
            contact: userRes.data?.contact,
            address: userRes.data?.address,
          };
        });
      } else {
        toast.error(userRes.response?.data?.message);
      }
    })();
  }, []);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateRes = await axios.patch(
        apis.SERVER_BASE_URL + "api/user",
        userInfo
      );

      if (updateRes.status === 200) {
        toast.success(updateRes.data?.message);
      }
    } catch(error) {
      toast.error(error?.response?.data?.message);

    }

  };

  return (
    <div className="edit-account-container">
      <h2 className="edit-account-title">Edit Account</h2>
      <form className="edit-account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            onChange={changeInput}
            value={userInfo.name || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-input"
            onChange={changeInput}
            value={userInfo.dob || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            disabled
            value={userInfo.email || ""}
            onChange={changeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            className="form-input"
            placeholder="Enter your country"
            onChange={changeInput}
            value={userInfo.country || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            placeholder="Enter your city"
            onChange={changeInput}
            value={userInfo.city || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="form-input"
            placeholder="Enter your contact number"
            onChange={changeInput}
            value={userInfo.contact || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            className="form-input"
            placeholder="Enter your address"
            onChange={changeInput}
            value={userInfo.address || ""}
          ></textarea>
        </div>
        <button type="submit" className="form-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAccount;
