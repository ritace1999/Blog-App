import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi2";

import CropEasy from "./cropImage/CropEasy";

const ProfilePicture = ({ avatar }) => {
  const imageUrl = avatar ? `http://localhost:4000/uploads/${avatar}` : "";
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

      <div className="w-full flex items-center justify-center my-4 gap-x-5">
        <div className="relative w-16 h-16 rounded-full outline outline-offset-2 outline-w outline-primary overflow-hidden">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={imageUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
