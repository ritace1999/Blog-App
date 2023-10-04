import React, { useState } from "react";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePic } from "../../services/index/apiService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/reducers/userReducer";
import toast from "react-hot-toast";

const CropEasy = ({ photo, setOpenCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const mutation = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePic({
        token: token,
        formData: formData,
      });
    },
    onError: (error) => {
      toast.error("Failed to update profile picture. Please try again.");
      console.error(error);
    },
    onSuccess: (data) => {
      // Get the existing data from local storage
      const existingData = JSON.parse(localStorage.getItem("account")) || {};

      // Merge the new data with the existing data
      const updatedData = { ...existingData, ...data };

      // Update local storage with the merged data
      localStorage.setItem("account", JSON.stringify(updatedData));

      // Dispatch and show success toast
      dispatch(userActions.setUserInfo(updatedData));
      toast.success("Profile updated successfully");
    },
  });

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    try {
      if (!photo || !photo.url || !croppedAreaPixels) {
        toast.error(
          "Invalid photo data. Please select a valid photo and crop area."
        );
        return;
      }

      const croppedImg = await getCroppedImg(photo.url, croppedAreaPixels);
      const file = new File([croppedImg.file], `${photo.file?.name}`, {
        type: photo.file?.type,
      });
      const formData = new FormData();
      formData.append("profilePic", file);

      // Trigger the mutation with the token and formData
      mutation.mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      toast.error("Failed to update profile picture. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className="font-semibold text-dark-hard text-center mb-2">
          Crop Image
        </h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          <label
            htmlFor="zoomRange"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
            onClick={() => setOpenCrop(false)}
            className="px-5 py-2.5 rounded-lg text-primary border border-primary text-sm disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg text-white bg-primary text-sm disabled:opacity-70"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
