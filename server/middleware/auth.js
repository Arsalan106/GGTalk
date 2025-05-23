import User from "../models/User.js";
import jwt from "jsonwebtoken"
export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.headers.token;
        const decodedUser=jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(decodedUser.user_id).select("-password");
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        req.user=user;
        next();
    } catch(error){
        console.log("error in protect route middleware");
        return res.json({success:false,message:error.message});
    }
}
export const checkAuth=async(req,res)=>{
    res.json({success:true,user:req.user});
}