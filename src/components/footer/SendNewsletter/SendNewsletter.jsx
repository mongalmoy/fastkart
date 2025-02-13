import "./SendNewsletter.css";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { fileToBase64 } from "@/utils/fileToBase64";
import axios from "axios";
import { AppContext } from "@/components/context/WrapperContext";

const SendNewsletter = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const GlobalContext = useContext(AppContext);
  const { toast, loader, loading } = GlobalContext;

  const [mediaPreview, setMediaPreview] = useState({
    image: null,
    audio: null,
    video: null,
  });

  console.log("loader", loader);

  const onSubmit = () => {
    try {
      loading(true);

      const timeout = setTimeout(async () => {
        const sendNewsletterRes = await axios.post("api/send-newsletter", {
          subject: getValues()?.subject,
          body: getValues()?.message,
          ...mediaPreview,
        });

        if (sendNewsletterRes.status === 200) {
          toast?.success(sendNewsletterRes?.data?.message);
        } else {
          toast?.error(sendNewsletterRes?.data?.message);
        }

        clearTimeout(timeout);
        loading(false);
        setIsOpen(false);
        reset();
      }, 300);
    } catch (error) {
      loading(false);
      toast?.error("Unable to send mail. Please try again later.");
      console.log("Nesletter subscription error ===>", error);
    }
  };

  console.log(mediaPreview);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    fileToBase64(file)
      .then((result) => {
        console.log("result", result);
        setMediaPreview((prev) => ({
          ...prev,
          [type]: result.base64,
        }));
      })
      .catch((error) => {
        console.log(error);
        setMediaPreview((prev) => ({ ...prev, [type]: "" }));
      });
  };

  return (
    <div>
      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
            {/* Modal Header */}
            <Dialog.Title className="text-lg font-semibold">
              Send Newsletter
            </Dialog.Title>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Subject */}
              <div>
                <label className="block font-medium">Subject:</label>
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium">Message:</label>
                <textarea
                  {...register("message", {
                    required: "Message cannot be empty",
                  })}
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Recipients */}
              {/* <div>
                <label className="block font-medium">
                  Recipients (Emails):
                </label>
                <input
                  type="text"
                  {...register("recipients", {
                    required: "At least one recipient is required",
                    pattern: {
                      value:
                        /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}(, ?[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,})*$/,
                      message: "Enter valid email(s), separated by commas",
                    },
                  })}
                  placeholder="e.g., user1@example.com, user2@example.com"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
                {errors.recipients && (
                  <p className="text-red-500 text-sm">
                    {errors.recipients.message}
                  </p>
                )}
              </div> */}

              {/* Image Upload */}
              <div>
                <label className="block font-medium">Image Attachment:</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("imageAttachment")}
                  onChange={(e) => handleFileChange(e, "image")}
                />
                {/* {mediaPreview?.image && (
                  <Image
                    src={mediaPreview?.image}
                    alt="Selected"
                    className="w-full h-auto mt-2 rounded-lg shadow-lg"
                    width={100}
                    height={120}
                  />
                )} */}
              </div>

              {/* Audio Upload */}
              <div>
                <label className="block font-medium">Audio Attachment:</label>
                <input
                  type="file"
                  accept="audio/*"
                  {...register("audioAttachment")}
                  onChange={(e) => handleFileChange(e, "audio")}
                />
                {mediaPreview.audio && (
                  <audio controls className="mt-2">
                    <source src={mediaPreview.audio} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block font-medium">Video Attachment:</label>
                <input
                  type="file"
                  accept="video/*"
                  {...register("videoAttachment")}
                  onChange={(e) => handleFileChange(e, "video")}
                />
                {/* {mediaPreview.video && (
                  <video controls className="w-full mt-2 rounded-lg shadow-lg">
                    <source src={mediaPreview.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )} */}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setMediaPreview({ image: null, audio: null, video: null });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  disabled={loader}
                >
                  {loader ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SendNewsletter;
