"use client";

import styles from "@/styles/pages/auth/Entry.module.css";
import { FaFacebook, FaGoogle, FaLinkedin, FaPinterest } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Entry = ({ isLogin }) => {
  const router = useRouter();

  const redirectPage = () => {
    router.push(isLogin ? "/register" : "/login", undefined, { shallow: true });
  };

  console.log("Entry page")

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
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
                placeholder="Full Name"
                className={styles.inputField}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className={styles.inputField}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.inputField}
            />
          </div>
          <p className={styles.forgotPassword}>
            {/* Forgot Your Password? */}
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <b className="underline ms-1 cursor-pointer" onClick={redirectPage}>{isLogin ? "Register" : "Login"}</b>
          </p>
          <button className={styles.signInButton}>
            {isLogin ? "SIGN IN" : "SIGN UP"}
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
      </div>
    </div>
  );
};

export default Entry;
