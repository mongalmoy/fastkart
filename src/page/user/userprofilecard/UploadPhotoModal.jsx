"use client";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import axios from "axios";
import { apis } from "@/lib/constants";
import { AppContext } from "@/components/context/WrapperContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadPhotoModal({
  open,
  setOpen,
  userInfo,
  setUserImg,
}) {
  const { toast, loader, loading } = useContext(AppContext);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadImg, setUploadImg] = useState(null);

  async function uploadUserPhoto(fileName, fileType) {
    try {
      setUploading(true);
      const result = await axios.post(
        apis.SERVER_BASE_URL + "api/user/upload-photo",
        {
          fileName: "avatar_" + userInfo?.id,
          fileType: fileType, //"image/png",
          base64Img: uploadImg,
        }
      );
      setUploading(false);

      console.log("response result===>", result);

      if (result?.status === 200) {
        toast?.success(result.data?.message);
        setUserImg(result?.data?.userImg);
        setUploadImg(null);
        setFileList([]);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast?.error(error?.response?.data?.message);
    }
  }

  const handleClickUpload = () => {
    console.log(fileList);
    const file = fileList[0];
    uploadUserPhoto(file?.name, file?.type);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      fileToBase64(file);
      return false;
    },
    fileList,
  };

  const fileToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      className="upload_photo_modal"
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Upload your photo here
          </Typography>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleClickUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{
              marginTop: 16,
            }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}