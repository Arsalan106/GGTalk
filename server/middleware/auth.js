import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // Set user for next middleware
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const checkAuth=async(req,res)=>{
    res.json({success:true,user:req.user});
}