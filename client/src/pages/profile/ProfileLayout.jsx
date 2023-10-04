import React, { useState, useEffect } from "react";
import { HiEnvelope, HiFingerPrint, HiUser } from "react-icons/hi2";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import styles from "../../styles/form.module.css";
import { getUserProfile, updateProfile } from "../../services/index/apiService";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
import ProfilePicture from "../../components/ProfilePicture";

function ProfileLayout() {
  const [show, setShow] = useState({ oldPassword: false, newPassword: false });

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  // Fetch user profile data using the useQuery hook
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
    },

    onSubmit: async (values) => {
      const { name, email, token } = values; // Extract token here
      mutate({ name, email, token }); // Pass the token to updateProfile
      console.log(values);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email },
      });
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

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    // Populate the form with profile data if it's available and loading has completed
    if (!profileIsLoading && profileData) {
      formik.setValues({
        name: profileData.name || "",
        email: profileData.email || "",
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [profileIsLoading, profileData]);
  console.log("ABc");
  console.log(profileData?.avatar);

  return (
    <div className="flex h-screen">
      <div className="md:mt-8 mx-auto shadow-2xl shadow-blue-500/60 bg-slate-50  rounded-md w-[90%] md:w-[75%] lg:w-[65%]  md:h-[85%] ">
        <div>
          <div className="text-center py-6">
            <section className="w-[90%] mx-auto flex flex-col gap-2 md:w-[65%] lg:w-[50%]">
              <div className="title">
                <h1 className="text-grey-800 text-2xl font bold py-4">
                  Edit Your Profile
                </h1>
              </div>
              <ProfilePicture avatar={profileData?.avatar} />
              <form
                className="flex flex-col gap-4 container"
                onSubmit={formik.handleSubmit}
              >
                <div className={`${styles.input_group} `}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className={styles.input_text}
                    {...formik.getFieldProps("name")}
                  />
                  <span className="icon flex items-center px-4">
                    <HiUser size={20} />
                  </span>
                </div>

                <div className={`${styles.input_group} `}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={styles.input_text}
                    {...formik.getFieldProps("email")}
                  />
                  <span className="icon flex items-center px-4">
                    <HiEnvelope size={20} />
                  </span>
                </div>

                <div className={`${styles.input_group} `}>
                  <input
                    type={`${show.oldPassword ? "text" : "password"}`}
                    name="oldPassword"
                    placeholder="Old Password"
                    className={styles.input_text}
                    {...formik.getFieldProps("oldPassword")}
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, oldPassword: !show.oldPassword })
                    }
                    className="icon flex items-center px-4 cursor-pointer	"
                  >
                    <HiFingerPrint size={20} />
                  </span>
                </div>

                <div className={`${styles.input_group} `}>
                  <input
                    type={`${show.newPassword ? "text" : "password"}`}
                    name="newPassword"
                    placeholder="New Password"
                    className={styles.input_text}
                    {...formik.getFieldProps("newPassword")}
                  />
                  <span
                    onClick={() =>
                      setShow({ ...show, newPassword: !show.newPassword })
                    }
                    className="icon flex items-center px-4 cursor-pointer	"
                  >
                    <HiFingerPrint size={20} />
                  </span>
                </div>

                <div className="input_button">
                  <button className={styles.button} type="submit">
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
