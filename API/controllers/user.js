import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    console.log("request received");
  const { name, gmail, password } = req.body;

  try {
    let user = await User.findOne({ gmail });
    if (user) return res.status(400).json({ message: "User Already Exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = await User.create({ name, gmail, password: hashedPassword });

    res.json({ message: "User Registered Successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    let user = await User.findOne({ gmail });

    if (!user) return res.json({ message: "User not exist.." });
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) return res.json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, "!@#$%^&*()", {
      expiresIn: "7d",
    });

    res.json({ message: `Welcome ${user.name}`, token });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  res.json({ user: req.user });
};
