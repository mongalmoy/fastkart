"use client";

import { apis } from "@/lib/constants";
import { setUserInfo } from "@/react-redux/slices/users/userSlice";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state?.user?.userDetails)

  useEffect(() => {
    (async () => {
      try {
        const userRes = await axios.get(apis.SERVER_BASE_URL + "api/user");
        if (userRes.status === 200) {
          dispatch(setUserInfo(userRes.data));
        }
      } catch(error) {
        console.log(error);
        dispatch(setUserInfo({}));
      }
    })();
  }, []);

  return (
    <>
      <Image
        src={userInfo?.imageurl || ""} // Replace with your image URL
        alt="User Profile"
        className="profile-image"
        height={100}
        width={100}
        loading="lazy"
      />
      <h2 className="user-name">{userInfo?.name}</h2>
    </>
  );
};

export default ProfileImage;
