"use client";

import { apis } from "@/lib/constants";
import { setUserInfo } from "@/react-redux/slices/users/userSlice";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbCameraPlus } from "react-icons/tb";
import { Skeleton, Tooltip } from "@mui/material";
import Image from "next/image";
import { AppContext } from "@/components/context/WrapperContext";
import UploadPhotoModal from "./UploadPhotoModal";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const { toast, loader, loading } = useContext(AppContext);
  const userInfo = useSelector((state) => state?.user?.userDetails);

  const [userImg, setUserImg] = useState(null);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        loading(true);
        const userRes = await axios.get(apis.SERVER_BASE_URL + "api/user");
        if (userRes.status === 200) {
          dispatch(setUserInfo(userRes.data));
          setUserImg(userRes.data?.userImg)
          loading(false);
        }
      } catch (error) {
        console.log(error);
        loading(false);
        dispatch(setUserInfo({}));
      }
    })();
  }, []);

  return (
    <>
      <div className="user_img_container">
        {!loader ? (
          <Image
            src={userImg || ""} // Replace with your image URL
            alt="User Profile"
            className="profile-image"
            height={100}
            width={100}
            loading="lazy"
          />
        ) : (
          <Skeleton className="profile_image_skeleton" variant="circular" width={100} height={100} />
        )}
        <Tooltip title={"Select Photo"}>
          <div
            className="upload_image_icon"
            onClick={() => setOpenPhotoModal(true)}
          >
            <TbCameraPlus />
          </div>
        </Tooltip>
      </div>

      <h2 className="user-name">{userInfo?.name}</h2>

      <UploadPhotoModal
        open={openPhotoModal}
        setOpen={setOpenPhotoModal}
        userInfo={userInfo}
        setUserImg={setUserImg}
      />
    </>
  );
};

export default ProfileImage;
