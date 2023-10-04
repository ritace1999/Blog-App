import { uploadPic } from "../middleware/upload.profile.js";
import { fileRemover } from "../utils/fileRemover.js";
import bcrypt from "bcrypt";

import User from "../models/user.model.js";

class ProfileController {
  user = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      res.json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } catch (error) {
      next({
        msg: "Unable to fulfill request at this moment",
        status: 500,
      });
    }
  };
  update = async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const userId = req.user._id;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return next({
          msg: "User not found",
          status: 404,
        });
      }

      // Update profile details if provided
      if (name) {
        user.name = name;
      }

      if (email) {
        user.email = email;
      }

      // Save the updated user document
      await user.save();

      // Fetch the updated user to include in the response
      const updatedUser = await User.findById(userId);

      res.json({
        _id: updatedUser._id,
        avatar: updatedUser.avatar,
        name: updatedUser.name,
        email: updatedUser.email,
        verified: updatedUser.verified,
        admin: updatedUser.admin,
        message: "Profile updated successfully",
      });
    } catch (error) {
      next({
        msg: "Unable to update profile",
        status: 500,
      });
    }
  };
  passwordUpdate = async (req, res, next) => {
    try {
      const { opassword, password } = req.body;
      const userId = req.user._id;

      // Validate input fields
      if (!opassword || !password) {
        return res
          .status(400)
          .json({ msg: "Both old password and new password are required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return next({
          msg: "User not found",
          status: 404,
        });
      }

      const passwordMatch = await bcrypt.compare(opassword, user.password);

      if (passwordMatch) {
        // Check if new password is same as old password
        const newPasswordMatchesOld = await bcrypt.compare(
          password,
          user.password
        );
        if (newPasswordMatchesOld) {
          return next({
            msg: "New password cannot be the same as the old password",
            status: 422,
          });
        }

        const hash = await bcrypt.hash(password, 10);
        await user.updateOne({ password: hash });
        return res.json({
          msg: "Password changed successfully.",
        });
      } else {
        return next({
          msg: "Incorrect Old Password",
          status: 401,
        });
      }
    } catch (err) {
      return next({
        msg: err.message || "An error occurred while changing password",
        status: 500,
      });
    }
  };

  updateProfilePic = async (req, res, next) => {
    try {
      // Use the uploadPic middleware to handle the file upload
      uploadPic.single("profilePic")(req, res, async function (err) {
        if (err) {
          // Handle the upload error
          const error = new Error("An unknown error occurred when uploading");
          next(error);
        } else {
          if (req.file) {
            let filename;
            let updatedUser = await User.findById(req.user._id);
            filename = updatedUser.avatar;
            if (filename) {
              fileRemover(filename);
            }
            updatedUser.avatar = req.file.filename;
            await updatedUser.save();
            res.json({
              _id: updatedUser._id,
              avatar: updatedUser.avatar,
              name: updatedUser.name,
              email: updatedUser.email,
              verified: updatedUser.verified,
              admin: updatedUser.admin,
            });
          } else {
            let filename;
            let updatedUser = await User.findById(req.user._id);
            filename = updatedUser.avatar;
            updatedUser.avatar = "";
            await updatedUser.save();
            fileRemover(filename);
            res.json({
              _id: updatedUser._id,
              avatar: updatedUser.avatar,
              name: updatedUser.name,
              email: updatedUser.email,
              verified: updatedUser.verified,
              admin: updatedUser.admin,
            });
          }
        }
      });
    } catch (error) {
      // Handle any other errors
      next({
        msg: "Unable to update profile Picture",
        status: 500,
      });
    }
  };
}

export default new ProfileController();
