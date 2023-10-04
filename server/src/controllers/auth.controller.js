import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

class AuthController {
  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          msg: "User already registered",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // If email and password are correct, generate a JWT token

      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      return res.status(201).json({
        _id: newUser._id,
        avatar: newUser.avatar,
        name: newUser.name,
        email: newUser.email,
        verified: newUser.verified,
        admin: newUser.admin,
        token: token,
      });
    } catch (err) {
      console.error(err);
      next({
        msg: "Unable to register at this moment",
        status: 500,
      });
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          msg: "User not found",
        });
      }

      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          msg: "Invalid password",
        });
      }

      // If email and password are correct, generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: token,
      });
    } catch (err) {
      console.error(err);
      next({
        msg: "Unable to login at this moment",
        status: 500,
      });
    }
  };
}

export default new AuthController();
