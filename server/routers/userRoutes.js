import express from "express";
import { login,signup,updateProfile } from "../conrollers/userController.js";
import { checkAuth, protectRoute } from "../middleware/auth.js";
const userRouter=express.Router();
userRouter.post("/login", login) 
userRouter.post("/signup",signup);
userRouter.put("/updateProfile",protectRoute,updateProfile)
userRouter.get("/check",protectRoute,checkAuth)
export default userRouter;