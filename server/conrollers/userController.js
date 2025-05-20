import User from "../models/User";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import jwt from "jsonwebtoken"
//signup a new user

export const signup = async (req, res) => {
    
    try {
        const { fullName, email, password, bio } = req.body;
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing details" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(salt, password);
        const newUser = await User.create({
            fullName, email, password, bio
        });
        const token = generateToken(newUser._id);
        res.json({success:true,userData:newUser,token:token,message:"Account created succesfully"});

    } catch (error) {
        console.log("errorn in signup",error.message);
        res.json({success:false,message:error.message});
    }   
}

//controller for login

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"user not found"
            })
        }
        const isCorrect=await bcrypt.compare(password,user.password);
        if(!isCorrect){
            return res.json({
                success:false,
                message:"invalid credentials"
            })
        }
        const token=generateToken(user._id);
        res.json({
            success:true,
            data:user,
            token:token,
            message:"Login successfully"
        })
    } catch(error){
        console.log("error in login controller");
        res.json({
            success:false,
            message:error.message
        })
    }
}