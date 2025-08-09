import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// create user logic :-

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or name already in use",
        field: existingUser.email === email ? "email" : "name",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error.stack || error.message || error);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Login user logic :-

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true if using HTTPS
        sameSite: "Lax",
      });
      return res.status(200).json({ message: "Login successful" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

//  Logout logic :

export const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      expires: new Date(0), // Set to past date to expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};
