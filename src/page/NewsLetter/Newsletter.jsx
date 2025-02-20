"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/context/WrapperContext";
import axios from "axios";
import { useSelector } from "react-redux";
import SendNewsletter from "./SendNewsletter/SendNewsletter";
import { FaSpinner } from "react-icons/fa";

const NewsLetter = () => {
  const GlobalContext = useContext(AppContext);
  const { toast, loader, loading } = GlobalContext;

  const user = useSelector((state) => state.user);

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, [user?.email]);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [showNewsletterBox, setShowNewsletterBox] = useState(false);

  const handleSubmitNewsletterEmail = async (e) => {
    e.preventDefault();
    try {
      loading(true);
      const subscribeRes = await axios.post("api/subscribe", {
        email: newsletterEmail,
      });
      loading(false);

      if (subscribeRes.status === 201) {
        toast?.success(subscribeRes?.data?.message);
        setNewsletterEmail("");
      } else {
        toast?.error(subscribeRes?.data?.message);
      }
    } catch (error) {
      console.log("Nesletter subscription error ===>", error);
    }
  };

  return userEmail === "admin@fastkart.com" ? (
    <>
      <button
        className="subscribe_form_btn mb-5"
        onClick={() => setShowNewsletterBox(true)}
      >
        Send Newsletter
      </button>

      {showNewsletterBox ? (
        <SendNewsletter
          isOpen={showNewsletterBox}
          setIsOpen={setShowNewsletterBox}
        />
      ) : null}
    </>
  ) : (
    <>
      <h3>Get the News</h3>

      <form className="subscribe-form" onSubmit={handleSubmitNewsletterEmail}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={newsletterEmail || ""}
          onChange={(e) => setNewsletterEmail(e.target.value)}
        />
        <button className="subscribe_form_btn flexbox" type="submit">
          {loader ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      <h3 className="mt-2 mb-4">Keep In Touch</h3>
    </>
  );
};

export default NewsLetter;
