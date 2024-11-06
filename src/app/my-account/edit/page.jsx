"use client";

import { AppContext } from "@/components/context/WrapperContext";
import { apis } from "@/lib/constants";
import { setUserInfo } from "@/react-redux/slices/users/userSlice";
import "@/styles/app/my-account/edit/style.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const EditAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const GlobalContext = useContext(AppContext);

  const toast = GlobalContext?.toast;

  const [userDetails, setUserDetails] = useState({
    name: "",
    dob: "",
    email: "",
    country: "",
    city: "",
    contact: "",
    address: "",
  });

  console.log("userDetails", userDetails)

  useEffect(() => {
    (async () => {
      const userRes = await axios.get(apis.SERVER_BASE_URL + "api/user");
      if (userRes.status === 200) {
        setUserDetails((prev) => {
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
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateRes = await axios.patch(
        apis.SERVER_BASE_URL + "api/user",
        userDetails
      );

      if (updateRes.status === 200) {
        toast.success(updateRes.data?.message);
        dispatch(setUserInfo(updateRes.data?.user))
        router.push("/my-account");
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
            value={userDetails.name || ""}
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
            value={userDetails.dob || ""}
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
            value={userDetails.email || ""}
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
            value={userDetails.country || ""}
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
            value={userDetails.city || ""}
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
            value={userDetails.contact || ""}
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
            value={userDetails.address || ""}
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
