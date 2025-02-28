import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const Authenticate = async (req, res, next) => {
  let token = req.header("Authorization");

  console.log("Received Token:", token);

  if (!token) return res.status(401).json({ message: "Please log in first" });

  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim(); // ✅ Remove "Bearer "
    }

    console.log("Extracted Token:", token); // 🔍 Debugging

    const decoded = jwt.verify(token, "!@#$%^&*()");

    console.log("Decoded Token:", decoded); // 🔍 Debugging

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User does not exist" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};




/* import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export const Authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; 


  try {
    if (!token) return res.status(401).json({ message: "Please log in first" });

    const decoded = jwt.verify(token, "!@#$%^&*()");

    const id = decoded.userId;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User does not exist" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};
 */