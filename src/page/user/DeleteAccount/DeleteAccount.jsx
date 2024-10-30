"use client";

import { AppContext } from "@/components/context/WrapperContext";
import { apis } from "@/lib/constants";
import "@/styles/page/user/deleteaccout/DeleteAccount.css"; // Import the CSS file
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const DeleteAccount = () => {
  const GlobalContext = useContext(AppContext);
  const toast = GlobalContext?.toast;

  const router = useRouter();

  const [confirmText, setConfirmText] = useState("");

  const handleInputChange = (e) => {
    setConfirmText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmText === "DELETE") {
      // Proceed with the account deletion
      try {
        const deleteRes = await axios.delete(apis.SERVER_BASE_URL + "api/user");
        toast?.success(deleteRes?.data?.message);
        router.push("/register");
      } catch (error) {
        toast?.error(error?.response?.data?.message);
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Please type DELETE to confirm.",
      });
    }
  };

  return (
    <div className="delete-account-container">
      <h2 className="delete-account-title">Delete Account</h2>
      <p className="delete-account-text">
        Are you sure you want to delete your account? This action is
        irreversible. Please type <strong>DELETE</strong> in the field below to
        confirm.
      </p>
      <form className="delete-account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="confirmText"
            className="form-input"
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="form-button delete-button">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
