"use client";

import styles from "@/styles/page/auth/Entry.module.css";
import { FaFacebook, FaGoogle, FaLinkedin, FaPinterest } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/components/context/WrapperContext";
import { CircularProgress } from "@mui/material";

const Entry = ({ isLogin }) => {
  const GlobalContext = useContext(AppContext);
  const toast = GlobalContext?.toast;

  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);

  const redirectPage = () => {
    router.push(isLogin ? "/register" : "/login", undefined, { shallow: true });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setUserInfo(prev => {
      return {...prev, [name]:value};
    })
  }

  // Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("api/auth/register", userInfo)
      setLoading(false);

      console.log("response", response)

      if(response.status===201) {
        toast?.success(response.data?.message)

        localStorage.setItem("userId", response.data?.user?.id)

        router.push("/")
      } else {
        toast?.error(response.data?.message)
      }

    } catch(error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  // Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("api/auth/login", userInfo)
      setLoading(false);

      console.log("response", response)

      if(response.status===200) {
        toast?.success(response.data?.message)

        localStorage.setItem("userId", response.data?.user?.id)

        router.push("/")
      } else {
        toast?.error(response.data?.message)
      }

    } catch(error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.message)
    }
  }

  console.log("Entry page")

  return (
    <div className={styles.outerContainer}>
      <form className={styles.container} onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        <div
          className={
            isLogin
              ? styles.signInSection
              : styles.signInSection + " " + styles.signInSection_toogle
          }
        >
          <h2 className={styles.mainHeading}>
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>
          <div className={styles.socialIcons}>
            <button className={styles.iconButton}>
              <FaGoogle />
            </button>
            <button className={styles.iconButton}>
              <FaFacebook />
            </button>
            <button className={styles.iconButton}>
              <FaPinterest />
            </button>
            <button className={styles.iconButton}>
              <FaLinkedin />
            </button>
          </div>
          <p className="my-2">or</p>
          <div className={styles.inputContainer}>
            {!isLogin && (
              <input
                type="name"
                name="name"
                placeholder="Full Name"
                className={styles.inputField}
                onChange={handleInputChange}
                value={userInfo.name}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputField}
              onChange={handleInputChange}
              value={userInfo.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              onChange={handleInputChange}
              value={userInfo.password}
            />
          </div>
          <p className={styles.forgotPassword}>
            {/* Forgot Your Password? */}
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <b className="underline ms-1 cursor-pointer" onClick={redirectPage}>{isLogin ? "Register" : "Login"}</b>
          </p>
          <button className={styles.signInButton} type="submit">
            {loading && <CircularProgress size={20} className="me-2" style={{color:"#fff"}} />}
            {loading ? "Fetching..." : isLogin ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>
        <div
          className={
            isLogin
              ? styles.signUpSection
              : styles.signUpSection + " " + styles.signUpSection_toogle
          }
        >
          <h2 className={styles.hello_friend}>
            {isLogin ? "Welcome Users" : "Hello, Friend!"}
          </h2>
          <p className="text-center">
            {isLogin
              ? "Login with email and password to use all the features"
              : "Register with your personal details to use all of site features"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Entry;
