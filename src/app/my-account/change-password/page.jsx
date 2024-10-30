"use client";

import { useContext, useState } from "react";
import { AppContext } from "@/components/context/WrapperContext";
import { apis } from "@/lib/constants";
import "@/styles/app/my-account/change-password/style.css";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const GlobalContext = useContext(AppContext);
  const toast = GlobalContext?.toast;
  
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setPasswordInfo(prev => ({...prev, [name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Paswords is not similar please check again"
      })
    } else {
      try {
        const updatePassword = await axios.patch(apis.SERVER_BASE_URL + "api/user/password", passwordInfo);

        console.log(updatePassword)
  
        if(updatePassword.status===200) {
          toast.success(updatePassword?.data?.message)
          setPasswordInfo(prev => ({oldPassword: "", newPassword: "", confirmPassword: ""}))
        }
      } catch(error) {
        toast.error(error.response?.data?.message)
      }
      
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="old-password">Your Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="old-password"
            className="form-input"
            placeholder="Enter old password"
            onChange={handleChangeInput}
            value={passwordInfo.oldPassword}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Your New Password</label>
          <input
            type="password"
            name="newPassword"
            id="new-password"
            className="form-input"
            placeholder="Enter new password"
            onChange={handleChangeInput}
            value={passwordInfo.newPassword}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Your New Password</label>
          <input
            type="text"
            name="confirmPassword"
            id="confirm-password"
            className="form-input"
            placeholder="Confirm new password"
            onChange={handleChangeInput}
            value={passwordInfo.confirmPassword}
          />
        </div>
        <button type="submit" className="form-button">Update</button>
      </form>
    </div>
  )
}

export default ChangePassword